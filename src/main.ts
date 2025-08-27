import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ColorfulLogger } from './utility/colorful-logger.utility';

async function bootstrap() {
  const logger = new ColorfulLogger();

  const app = await NestFactory.create(AppModule, { logger, cors: true });
  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT') ?? 3000;
  await app.listen(port);
  logger.log(`App is running on port: ${port}`);
}
bootstrap();
