import { UserRoleEnum, UserStatusEnum } from '../enum/user.enum'

export class UserDto {
  id: number
  email: string
  firstName?: string
  lastName?: string
  status: UserStatusEnum
  role: UserRoleEnum
  confirmationToken?: string
  resetToken?: string
  createdAt: Date
  updatedAt: Date
}

export class CreateUserDto {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

export class UpdateUserDto {
  id: number
  firstName?: string
  lastName?: string
  status?: UserStatusEnum
  role?: UserRoleEnum
  confirmationToken?: string
  resetToken?: string
}