import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { ColorfulLogger } from 'src/utility/colorful-logger.utility';
import { UrlsEntity } from './urls.entity';
import { UrlCodeGeneratorService } from '../url-code-gen/url-code-gen.service';

@Module({
  controllers: [UrlsController],
  exports: [UrlsService],
  imports: [TypeOrmModule.forFeature([UrlsEntity])],
  providers: [UrlsService, ColorfulLogger, UrlCodeGeneratorService],
})
export class UrlsModule {}
