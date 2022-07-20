import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { AcceptLanguageResolver, GraphQLWebsocketResolver, I18nModule, QueryResolver } from 'nestjs-i18n'

import { getPostgresConfig } from './config/postgres.config'
import { UserModule } from './user/user.module'
import { CommonModule } from './common/common.module'
import { AuthModule } from './auth/auth.module'
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class'
      },
      subscriptions: {
        'graphql-ws': true
      },
      context: (ctx) => ctx
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(process.cwd(), 'src/i18n/'),
        watch: true
      },
      resolvers: [
        GraphQLWebsocketResolver,
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ]
    }),
    CommonModule,
    UserModule,
    AuthModule,
    MailModule
  ]
})
export class AppModule {
}
