import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfig {
  constructor(private configService: ConfigService) {}
  public readonly DB_HOST: string = this.configService.get<string>('DB_HOST');
  public readonly DB_PORT: number = this.configService.get<number>('DB_PORT');
  public readonly DB_USERNAME: string = this.configService.get<string>('DB_USERNAME');
  public readonly DB_PASSWORD: string = this.configService.get<string>('DB_PASSWORD');
  public readonly DB_NAME: string = this.configService.get<string>('DB_NAME');
  public readonly DB_LOG_ENABLE: boolean = this.configService.get<boolean>('DB_LOG_ENABLE');
}
