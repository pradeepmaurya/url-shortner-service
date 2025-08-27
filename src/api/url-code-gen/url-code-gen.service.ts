import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlsEntity } from '../urls/urls.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrlCodeGeneratorService {
  constructor(
    @InjectRepository(UrlsEntity)
    private urlsEntityRepo: Repository<UrlsEntity>,
  ) {}

  async generateUniqueCode(): Promise<string> {
    // Define the shape of the raw result
    type LastRecord = { id: number } | null | undefined;
    const lastRecord: LastRecord = await this.urlsEntityRepo
      .createQueryBuilder()
      ?.select('id')
      ?.orderBy('id', 'DESC')
      ?.limit(1)
      ?.getRawOne();
    const lastId = lastRecord?.id ?? 1;
    return this.encodeBase62(lastId + 1000); // offset to make it look better
  }

  private encodeBase62(num: number): string {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let encoded = '';
    while (num > 0) {
      const remainder = num % 62;
      encoded = chars[remainder] + encoded;
      num = Math.floor(num / 62);
    }
    return encoded;
  }
}
