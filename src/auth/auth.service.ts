import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { I18nService } from 'nestjs-i18n'
import * as moment from 'moment'
import * as bcrypt from 'bcryptjs'
import * as jsonwebtoken from 'jsonwebtoken'

import { JwtConfig } from '../config/jwt.config'
import { UserService } from '../user/user.service'
import { CreateUserDto, UserWithPasswordDto } from '../user/dto/user.dto'
import { LoginDto, ResetPasswordDto } from './dto/auth.dto'
import { UserStatusEnum } from '../user/enum/user.enum'
import { MailService } from '../mail/mail.service'
import { confirmationMail } from '../mail/template/confirmation.template'
import { passwordRecoveryMail } from '../mail/template/password-recovery.template'
import { USER } from '../common/constant/user.constant'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
    private readonly mailService: MailService
  ) {
  }

  async signUp(user: CreateUserDto): Promise<Boolean> {
    user.confirmationToken = await this.createToken({ email: user.email }, '7d')

    const confirmationLink = `${process.env.FRONTEND_URL}/auth/confirmation?token=${user.confirmationToken}`
    try {
      await this.mailService.send(confirmationMail(user, confirmationLink))
      return !!await this.userService.createUser(user)
    } catch (e) {
      throw new HttpException(this.i18n.t('errors.SERVER_ERROR'), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async signIn(data: LoginDto): Promise<string> {
    const user = await this.userService.findByEmail(data.email)
    if (!user)
      throw new HttpException(this.i18n.t('errors.USER_WITH_THIS_EMAIL_NOT_FOUND'), HttpStatus.NOT_FOUND)
    if (user.status !== UserStatusEnum.ACTIVE)
      throw new HttpException(this.i18n.t('errors.USER_IS_NOT_ACTIVE'), HttpStatus.FORBIDDEN)
    if (!await AuthService.comparePassword(data.password, user.password))
      throw new HttpException(this.i18n.t('errors.PASSWORD_NOT_MATCH'), HttpStatus.UNAUTHORIZED)

    const tokens = await this.createAuthTokens(user)
    const { accessToken, refreshToken } = tokens

    await this.userService.updateUser({ ...user, refreshToken })
    return accessToken
  }

  async refreshToken(email: string): Promise<string> {
    const user = await this.userService.findByEmail(email)
    if (!user)
      throw new HttpException(this.i18n.t('errors.USER_WITH_THIS_EMAIL_NOT_FOUND'), HttpStatus.NOT_FOUND)
    if (!user.refreshToken)
      throw new HttpException(this.i18n.t('errors.USER_UNAUTHORIZED'), HttpStatus.UNAUTHORIZED)

    // @ts-ignore
    const { expAt } = await jsonwebtoken.decode(user.refreshToken)
    const isValid = moment().isBefore(expAt) && !!jsonwebtoken.verify(user.refreshToken, process.env.JWT_SECRET)
    if (!isValid)
      throw new HttpException(this.i18n.t('errors.REFRESH_TOKEN_EXPIRED'), HttpStatus.UNAUTHORIZED)

    const tokens = await this.createAuthTokens(user)
    const { accessToken, refreshToken, accessTokenExpAt } = tokens

    await this.userService.updateUser({ ...user, refreshToken })
    return accessToken
  }

  async recoveryPassword(email: string): Promise<Boolean> {
    const user = await this.userService.findByEmail(email)
    if (!user)
      throw new HttpException(this.i18n.t('errors.USER_WITH_THIS_EMAIL_NOT_FOUND'), HttpStatus.NOT_FOUND)

    user.resetToken = await this.createToken({ email }, '7d')
    const recoveryLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${user.resetToken}`

    try {
      await this.mailService.send(passwordRecoveryMail(user, recoveryLink))
      return !!await this.userService.updateUser(user)
    } catch (e) {
      throw new HttpException(this.i18n.t('errors.SERVER_ERROR'), HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async resetPassword({password, token}: ResetPasswordDto): Promise<Boolean> {
    const user = await this.userService.findByResetToken(token)
    if (!user)
      throw new HttpException(this.i18n.t('errors.RESET_TOKEN_EXPIRED'), HttpStatus.FORBIDDEN)

    user.password = await AuthService.hashPassword(password)
    user.resetToken = null

    return !!await this.userService.updateUser(user)
  }

  private static async hashPassword(password: string) {
    const salt = await bcrypt.genSaltSync(USER.SALT_OR_ROUNDS)
    return await bcrypt.hashSync(password, salt)
  }

  private static async comparePassword(attempt: string, password: string): Promise<Boolean> {
    return await bcrypt.compareSync(attempt, password)
  }

  private async createToken(payload, expiresIn: string): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn })
  }

  private async createAuthTokens(user: UserWithPasswordDto): Promise<any> {
    const { id, email, role, status } = user
    const payload = { id, email, role, status }
    return {
      accessToken: await this.createToken(
        { ...payload, expAt: moment().add(JwtConfig.ACCESS_TOKEN_EXP_AT).toDate() },
        JwtConfig.ACCESS_TOKEN_EXPIRES_IN
      ),
      refreshToken: await this.createToken(
        { ...payload, expAt: moment().add(JwtConfig.REFRESH_TOKEN_EXP_AT).toDate() },
        JwtConfig.REFRESH_TOKEN_EXPIRES_IN
      )
    }
  }
}