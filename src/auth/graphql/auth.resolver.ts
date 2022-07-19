import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from '../auth.service'
import { CreateUserDto } from '../../user/dto/user.dto'
import { LoginDto } from '../dto/auth.dto'

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation('signUp')
  async signUp(@Args('signUpInput') data: CreateUserDto): Promise<Boolean> {
    return await this.authService.signUp(data)
  }

  @Mutation('signIn')
  async signIn(@Args('signInInput') data: LoginDto): Promise<string> {
    return await this.authService.signIn(data)
  }

  @Mutation('refreshToken')
  async refreshToken(@Args('email') email: string): Promise<string> {
    return await this.authService.refreshToken(email)
  }
}
