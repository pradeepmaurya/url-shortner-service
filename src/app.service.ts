import { Injectable } from '@nestjs/common';
import { ColorfulLogger } from './utility/colorful-logger.utility';

@Injectable()
export class AppService {
  constructor(private readonly logger: ColorfulLogger) {}

  public getHealth(): string {
    return 'Performing health check...';
  }
}
