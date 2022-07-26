import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getPostgresConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USERNAME'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DATABASE'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    dropSchema: false,
    synchronize: true,
    migrationsRun: false,
    logging: true,
    migrations: ['dist/**/db/migrations/*{.ts,.js}'],
  }
}