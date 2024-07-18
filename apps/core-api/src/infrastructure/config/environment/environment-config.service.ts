import { Dialect } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IConfig } from '../types';
import { JWT } from '../types/jwt.interface';
import { MailerConfig } from '../types/mailer.interface';
import { DBConfig } from './../types/database.interface';

@Injectable()
export class EnvironmentConfigService implements IConfig {
  private privateKey: string;
  private publicKey: string;
  constructor(private configService: ConfigService) {
    this.publicKey = readFileSync(
      join(__dirname, '..', '..', 'keys/public.key'),
      'utf-8'
    );
    this.privateKey = readFileSync(
      join(__dirname, '..', '..', 'keys/private.key'),
      'utf-8'
    );
  }

  getAppId(): string {
    return this.configService.get<string>('APP_ID');
  }

  //Mailer Config

  getEmailConfig(): MailerConfig {
    return {
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PWD'),
      },
      secure: this.configService.get<boolean>('EMAIL_SECURE'),
    };
  }

  //Jwt Config

  getJwtAccess(): Omit<JWT, 'secret'> {
    return {
      privateKey: this.privateKey,
      publicKey: this.publicKey,
      time: this.configService.get<number>('JWT_ACCESS_TIME'),
    };
  }
  getJwtConfirmation(): Omit<JWT, 'privateKey' | 'publicKey'> {
    return {
      secret: this.configService.get<string>('JWT_CONFIRMATION_SECRET'),
      time: this.configService.get<number>('JWT_CONFIRMATION_TIME'),
    };
  }
  getJwtResetPassword(): Omit<JWT, 'privateKey' | 'publicKey'> {
    return {
      secret: this.configService.get<string>('JWT_RESET_PASSWORD_SECRET'),
      time: this.configService.get<number>('JWT_RESET_PASSWORD_TIME'),
    };
  }
  getJwtRefresh(): Omit<JWT, 'privateKey' | 'publicKey'> {
    return {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      time: this.configService.get<number>('JWT_REFRESH_TIME'),
    };
  }
  //Logger Config
  getEsTransportOptions() {
    return {
      level: 'info',
      clientOpts: {
        node: this.configService.get<string>('LOGGING_HOST'),
        auth: {
          username: this.configService.get<string>('LOGGING_USER'),
          password: this.configService.get<string>('LOGGING_PWD'),
        },
      },
      retryLimit: 2,
      dataStream: true,
      bufferLimit: this.configService.get<number>('LOGGING_ES_BUFFER_SIZE'),
    };
  }

  // Database Config

  getDatabaseConfig(): DBConfig {
    return {
      system: {
        dialect: this.configService.get<Dialect>('DATABASE_SYSTEM_DIALECT'),
        host: this.configService.get<string>('DATABASE_SYSTEM_HOST'),
        port: this.configService.get<number>('DATABASE_SYSTEM_PORT'),
        username: this.configService.get<string>('DATABASE_SYSTEM_USER'),
        password: this.configService.get<string>('DATABASE_SYSTEM_PASSWORD'),
        name: this.configService.get<string>('DATABASE_SYSTEM_NAME'),
        schema: this.configService.get<string>('DATABASE_SYSTEM_SCHEMA'),
      },
      tenant: {
        dialect: this.configService.get<Dialect>('DATABASE_TENANT_DIALECT'),
        host: this.configService.get<string>('DATABASE_TENANT_HOST'),
        port: this.configService.get<number>('DATABASE_TENANT_PORT'),
        username: this.configService.get<string>('DATABASE_TENANT_USER'),
        password: this.configService.get<string>('DATABASE_TENANT_PASSWORD'),
        name: this.configService.get<string>('DATABASE_TENANT_NAME'),
        schema: this.configService.get<string>('DATABASE_TENANT_SCHEMA'),
      },
    };
  }
}
