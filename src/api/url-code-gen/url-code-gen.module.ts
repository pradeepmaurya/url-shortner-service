import { Module } from '@nestjs/common';
import { UrlCodeGeneratorService } from './url-code-gen.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlsEntity } from '../urls/urls.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlsEntity])],
  exports: [UrlCodeGeneratorService],
  providers: [UrlCodeGeneratorService],
})
export class UrlCodeGenerator {}
