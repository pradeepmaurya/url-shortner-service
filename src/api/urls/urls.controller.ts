import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UrlsService } from './urls.service';
import { ColorfulLogger } from 'src/utility/colorful-logger.utility';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { UrlsEntity } from './urls.entity';
import { NotFoundErrorResponseDTO } from 'src/common-dto/not-found-error.dto';

@Controller({
  path: 'api/urls/',
})
export class UrlsController {
  constructor(
    private readonly urlsService: UrlsService,
    private readonly logger: ColorfulLogger,
  ) {}

  @Get(':shortUrl')
  // @Redirect()
  public async getShortedUrl(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
  ) {
    this.logger.log(`Requested shortUrl for: ${shortUrl}`);

    try {
      // TODO: Implement this method in UrlsService
      const currentUrlEntity: UrlsEntity | NotFoundErrorResponseDTO =
        await this.urlsService.getOriginalUrl(shortUrl);
      return currentUrlEntity;
      // For now, return a placeholder response
      //    return res.status()
    } catch (error) {
      this.logger.error(`Error retrieving short URL: ${error.message}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error',
        shortCode: shortUrl,
      });
    }
  }

  @Post('shorten')
  public async createShortUrl(
    @Body() createShortUrlBody: CreateShortUrlDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(`Creating short URL for: ${createShortUrlBody.url}`);
      const shortUrlData =
        await this.urlsService.createShortUrl(createShortUrlBody);
      return res.status(HttpStatus.CREATED).json(shortUrlData);
    } catch (error: any) {
      this.logger.error(`Error creating short URL: ${error.message}`);
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        originalUrl: createShortUrlBody.url,
      });
    }
  }
}
