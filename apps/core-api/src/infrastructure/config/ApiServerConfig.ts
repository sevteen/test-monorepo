import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiServerConfig {
  constructor(private configService: ConfigService) {}
  public readonly APP_ID: string = this.configService.get<string>('APP_ID');
  public readonly HOST: string = this.configService.get<string>('API_HOST');
  public readonly PORT: number = this.configService.get<number>('API_PORT');
  public readonly JWT_ACCESS_TOKEN_SECRET: string = this.configService.get<string>('JWT_ACCESS_SECRET');
  public readonly JWT_ACCESS_TIME: number = this.configService.get<number>('JWT_ACCESS_TIME');
  public readonly JWT_CONFIRMATION_SECRET: string = this.configService.get<string>('JWT_CONFIRMATION_SECRET');
  public readonly JWT_CONFIRMATION_TIME: number = this.configService.get<number>('JWT_CONFIRMATION_TIME');
  public readonly JWT_RESET_PASSWORD_SECRET: string = this.configService.get<string>('JWT_RESET_PASSWORD_SECRET');
  public readonly JWT_RESET_PASSWORD_TIME: number = this.configService.get<number>('JWT_RESET_PASSWORD_TIME');
  public readonly JWT_REFRESH_SECRET: string = this.configService.get<string>('JWT_REFRESH_SECRET');
  public readonly JWT_REFRESH_TIME: number = this.configService.get<number>('JWT_REFRESH_TIME');
  public readonly DEBUG_MODE: boolean = this.configService.get<boolean>('DEBUG_MODE');
}
