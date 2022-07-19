import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserService } from '../user.service'
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto'

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query('users')
  async findAll(@Args('id') id: number): Promise<UserDto[]> {
    return await this.userService.findAll()
  }

  @Query('user')
  async findById(id: number): Promise<UserDto> {
    return await this.userService.findById(id)
  }

  @Mutation('createUser')
  async createUser(@Args('createUserInput') data: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(data)
  }

  @Mutation('updateUser')
  async updateUser(@Args('updateUserInput') data: UpdateUserDto): Promise<UserDto> {
    return await this.userService.updateUser(data)
  }

  @Mutation('deleteUser')
  async deleteUser(@Args('id') id: number): Promise<Boolean> {
    return await this.userService.deleteUser(id)
  }
}