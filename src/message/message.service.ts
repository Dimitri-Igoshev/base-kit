import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MessageEntity } from './entity/message.entity'
import { UserService } from '../user/user.service'
import { CreateMessageDto, MessageDto, UpdateMessageDto } from './dto/message.dto'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
    private readonly i18n: I18nService,
    private readonly userService: UserService
  ) {
  }

  async findAll(): Promise<MessageDto[]> {
    const message = await this.messageRepository.find({ relations: ['user'] })
    return message.map(message => message.toResponseObject())
  }

  async findById(id: number): Promise<MessageDto> {
    const message = await this.messageRepository.findOne({ where: { id }, relations: ['user'] })
    if (!message)
      throw new HttpException(this.i18n.t('errors.MESSAGE_NOT_FOUND'), HttpStatus.NOT_FOUND)

    return message.toResponseObject()
  }

  async createMessage(data: CreateMessageDto): Promise<MessageDto> {
    const user = await this.userService.findById(data.userId)
    if (!user)
      throw new HttpException(this.i18n.t('errors.USER_NOT_FOUND'), HttpStatus.NOT_FOUND)

    const message = await this.messageRepository.create({ text: data.text, user })
    await this.messageRepository.save(message)

    return message.toResponseObject()
  }

  async updateMessage(data: UpdateMessageDto): Promise<MessageDto> {
    let message = await this.messageRepository.findOne({ where: { id: data.id } })
    if (!message)
      throw new HttpException(this.i18n.t('errors.MESSAGE_NOT_FOUND'), HttpStatus.NOT_FOUND)

    await this.messageRepository.update({ id: data.id }, { ...data })
    message = await this.messageRepository.findOne({ where: { id: data.id } })

    return message.toResponseObject()
  }

  async deleteMessage(id: number): Promise<Boolean> {
    const message = await this.messageRepository.findOne({ where: { id } })
    if (!message) throw new HttpException(this.i18n.t('errors.MESSAGE_NOT_FOUND'), HttpStatus.NOT_FOUND)

    const deletedMessage = await this.messageRepository.remove(message)

    return !deletedMessage.id
  }
}
