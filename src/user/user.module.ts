import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entity/user.entity'
import { UserResolver } from './graphql/user.resolver';
import { MessageEntity } from '../message/entity/message.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MessageEntity])
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {
}
