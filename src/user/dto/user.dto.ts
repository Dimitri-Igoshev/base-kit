import { UserRoleEnum, UserStatusEnum } from '../enum/user.enum'
import { MessageEntity } from '../../message/entity/message.entity'

export class UserDto {
  id: number
  email: string
  firstName?: string
  lastName?: string
  status: UserStatusEnum
  role: UserRoleEnum
  messages?: MessageEntity[]
  confirmationToken?: string
  resetToken?: string
  createdAt: Date
  updatedAt: Date
}

export class UserWithPasswordDto {
  id: number
  email: string
  password: string
  firstName?: string
  lastName?: string
  status: UserStatusEnum
  role: UserRoleEnum
  confirmationToken?: string
  resetToken?: string
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
}

export class CreateUserDto {
  email: string
  password: string
  firstName?: string
  lastName?: string
  confirmationToken: string
}

export class UpdateUserDto {
  id: number
  firstName?: string
  lastName?: string
  status?: UserStatusEnum
  role?: UserRoleEnum
  confirmationToken?: string
  resetToken?: string
  refreshToken?: string
}