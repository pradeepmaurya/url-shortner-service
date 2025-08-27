import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ColorfulLogger } from './utility/colorful-logger.utility';
import { UrlsModule } from './api/urls/urls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsEntity } from './api/urls/urls.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes env available everywhere without re-import
      envFilePath: ['.env.local', '.env.prod'],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isSsl = configService.get<string>('DB_SSL') === 'true';

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [UrlsEntity],
          synchronize: configService.get<string>('ENV') !== 'production',
          ssl: isSsl
            ? { rejectUnauthorized: false } // for Neon
            : false, // for local pgsql
        };
      },
    }),

    UrlsModule,
    TypeOrmModule.forFeature([UrlsEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, ColorfulLogger],
  exports: [ColorfulLogger],
})
export class AppModule {}
