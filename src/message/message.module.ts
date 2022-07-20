import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageResolver } from './graphql/message.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageEntity } from './entity/message.entity'
import { UserService } from '../user/user.service'
import { UserEntity } from '../user/entity/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity, UserEntity])
  ],
  providers: [MessageService, MessageResolver, UserService]
})
export class MessageModule {
}
