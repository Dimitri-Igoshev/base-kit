import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from '../../common/entuty/base.entity'
import { UserEntity } from '../../user/entity/user.entity'
import { MessageDto } from '../dto/message.dto'

@Entity('message')
export class MessageEntity extends Base {
  @Column({type: 'text'})
  text: string

  @ManyToOne(type=> UserEntity, user => user.messages)
  user: UserEntity

  toResponseObject(): MessageDto {
    const { user, ...message } = this
    return user ? this : message
  }
}