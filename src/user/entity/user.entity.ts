import { BeforeInsert, Column, Entity } from 'typeorm'
import { IsEmail, Length } from 'class-validator'
import * as bcrypt from 'bcryptjs'

import { Base } from '../../common/entuty/base.entity'
import { UserDto } from '../dto/user.dto'
import { AUTH } from '../../common/constant/auth.constant'
import { UserRoleEnum, UserStatusEnum } from '../enum/user.enum'

@Entity('user')
export class UserEntity extends Base {
  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string

  @Column({ type: 'text' })
  @Length(8, 100)
  password: string

  @Column({ type: 'text', nullable: true })
  firstName?: string

  @Column({ type: 'text', nullable: true })
  lastName?: string

  @Column({ type: 'enum', enum: UserStatusEnum, default: UserStatusEnum.PADDING })
  status: UserStatusEnum

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum

  @Column({ nullable: true })
  confirmationToken?: string

  @Column({ nullable: true })
  resetToken?: string

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSaltSync(AUTH.SALT_OR_ROUNDS)
    this.password = await bcrypt.hashSync(this.password, salt)
  }

  async comparePassword(attempt: string): Promise<Boolean> {
    return await bcrypt.compareSync(attempt, this.password)
  }

  toResponseObject(): UserDto {
    const { password, ...user } = this
    return user
  }
}