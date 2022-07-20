import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { MessageService } from '../message.service'
import { CreateMessageDto, MessageDto, UpdateMessageDto } from '../dto/message.dto'

const pubSub = new PubSub()

@Resolver('Messages')
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {
  }

  @Query('messages')
  async getMessages(): Promise<MessageDto[]> {
    return await this.messageService.findAll()
  }

  @Query('message')
  async findById(id: number): Promise<MessageDto> {
    return await this.messageService.findById(id)
  }

  @Mutation('createMessage')
  async createMessage(@Args('createMessageInput') data: CreateMessageDto): Promise<MessageDto> {
    const message = await this.messageService.createMessage(data)
    await pubSub.publish('message', { message })
    return message
  }

  @Mutation('updateMessage')
  async updateMessage(@Args('updateMessageInput') data: UpdateMessageDto): Promise<MessageDto> {
    const message = await this.messageService.updateMessage(data)
    await pubSub.publish('message', { message })
    return message
  }

  @Mutation('deleteMessage')
  async deleteMessage(@Args('id') id: number): Promise<Boolean> {
    return await this.messageService.deleteMessage(id)
  }

  @Subscription()
  message() {
    return pubSub.asyncIterator('message')
  }
}