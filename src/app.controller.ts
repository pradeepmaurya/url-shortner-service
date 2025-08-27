import { Controller, Get, HttpStatus, Param, Redirect, Res, ServiceUnavailableException } from '@nestjs/common';
import { AppService } from './app.service';
import { ColorfulLogger } from './utility/colorful-logger.utility';
import { HealthCheckResult } from './types/health.types';
import { UrlsService } from './api/urls/urls.service';
import { UrlsEntity } from './api/urls/urls.entity';
import { NotFoundErrorResponseDTO } from './common-dto/not-found-errror.dto';
// import { Response } from 'express';

@Controller({ path: '/' })
export class AppController {
  constructor(private readonly appService: AppService, private readonly logger: ColorfulLogger, private urlsService: UrlsService) { }

  @Get(":shortCode")
  @Redirect()
  async getOriginalUrl(@Param('shortCode') shortCode: string) {
    const originalUrlEntity: UrlsEntity = await this.urlsService.getOriginalUrl(shortCode)
    if (originalUrlEntity?.originalUrl) {
      // return originalUrlEntity
      return { url: originalUrlEntity?.originalUrl }
    }
  }

  @Get('_health')
  async getHealth() {
    const health = await this.appService.getHealth();

    if (health.status === 'healthy') {
      return { ...health }; // Nest will return 200 by default
    } else {
      throw new ServiceUnavailableException(health);
    }
  }
}

