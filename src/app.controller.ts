import { Controller, Get, HttpStatus, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { ColorfulLogger } from './utility/colorful-logger.utility';
import { UrlsService } from './api/urls/urls.service';
import { UrlsEntity } from './api/urls/urls.entity';

@Controller({ path: '/' })
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: ColorfulLogger,
    private urlsService: UrlsService,
  ) {}

  @Get('_health')
  public getHealth() {
    return { status: HttpStatus.OK, message: this.appService.getHealth() };
  }

  @Get(':shortCode')
  @Redirect()
  async getOriginalUrl(@Param('shortCode') shortCode: string) {
    const originalUrlEntity: UrlsEntity =
      await this.urlsService.getOriginalUrl(shortCode);
    if (originalUrlEntity?.originalUrl) {
      return { url: originalUrlEntity?.originalUrl };
    }
  }
}
