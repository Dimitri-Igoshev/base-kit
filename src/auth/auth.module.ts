import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './graphql/auth.resolver'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { MailService } from '../mail/mail.service'

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('TOKEN_EXPIRES_IN') }
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, MailService],
})
export class AuthModule {
}
