import { RoleEnum } from '../enum/role.enum'

export class UserDto {
  id: number
  email: string
  createdAt: Date
  updatedAt: Date
}

export class CreateUserDto {
  email: string
  password: string
}

export class UpdateUserDto {
  id: number
  role: RoleEnum
}