import { UserEntity } from '../../user/entity/user.entity'

export class MessageDto {
  id: number
  text: string
  createdAt: Date
  updatedAt: Date
  user?: UserEntity
}

export class CreateMessageDto {
  text: string
  userId: number
}

export class UpdateMessageDto {
  id: number
  text: string
}