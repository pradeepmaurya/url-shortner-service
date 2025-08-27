export class ShortUrlResponseDto {
  id: number;
  originalUrl: string;
  shortedUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks?: number;
  message?: string;
}
