import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlsEntity } from './urls.entity';
import { UrlCodeGeneratorService } from '../url-code-gen/url-code-gen.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { ShortUrlResponseDto } from './dto/short-url-response.dto';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(UrlsEntity)
    private urlsRepository: Repository<UrlsEntity>,
    private urlCodeGeneratorService: UrlCodeGeneratorService,
  ) {}

  async createShortUrl(
    createShortUrlDto: CreateShortUrlDto,
  ): Promise<ShortUrlResponseDto> {
    // Generate unique short code using the injected service
    const shortCode = await this.urlCodeGeneratorService.generateUniqueCode();

    // Save to database
    const urlEntity = this.urlsRepository.create({
      originalUrl: createShortUrlDto.url,
      shortedUrl: shortCode,
    });

    const savedUrl = await this.urlsRepository.save(urlEntity);

    // Return response DTO
    return {
      id: savedUrl.id,
      originalUrl: savedUrl.originalUrl,
      shortedUrl: `http:localhost:4000/${shortCode}`,
      shortCode: shortCode,
      createdAt: savedUrl.createdAt,
      message: 'Short URL created successfully',
    };
  }

  async getOriginalUrl(shortCode: string): Promise<UrlsEntity> {
    const urlEntity: UrlsEntity | null = await this.urlsRepository.findOne({
      where: { shortedUrl: shortCode },
    });
    if (!urlEntity) {
      throw new NotFoundException(`Url not for ${shortCode}`);
    }
    return urlEntity;
  }
}
