import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from './entity/user.entity'
import { CreateUserDto, UpdateUserDto, UserDto } from './dto/user.dto'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    private readonly i18n: I18nService
  ) {
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find()
    return users.map(user => user.toResponseObject())
  }

  async findById(id: number): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new HttpException(this.i18n.t('errors.USER_NOT_FOUND'), HttpStatus.NOT_FOUND)

    return user.toResponseObject()
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const isExist = await this.userRepository.findOne({ where: { email: data.email } })
    if (isExist) throw new HttpException(this.i18n.t('errors.USER_ALREADY_EXIST'), HttpStatus.CONFLICT)

    const user = await this.userRepository.create(data)
    await this.userRepository.save(user)

    return user.toResponseObject()
  }

  async updateUser(data: UpdateUserDto): Promise<UserDto> {
    let user = await this.userRepository.findOne({ where: { id: data.id } })
    if (!user) throw new HttpException(this.i18n.t('errors.USER_NOT_FOUND'), HttpStatus.NOT_FOUND)

    await this.userRepository.update({ id: data.id }, { ...data })
    user = await this.userRepository.findOne({ where: { id: data.id } })

    return user.toResponseObject()
  }

  async deleteUser(id: number): Promise<Boolean> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new HttpException(this.i18n.t('errors.USER_NOT_FOUND'), HttpStatus.NOT_FOUND)

    const deletedUser = await this.userRepository.remove(user)

    return !deletedUser.id
  }
}