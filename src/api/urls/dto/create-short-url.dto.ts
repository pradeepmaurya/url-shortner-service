import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl({}, { message: 'Please provide a valid URL' })
  @IsNotEmpty({ message: 'URL is required' })
  url: string;
}
