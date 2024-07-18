import { AppsConfig } from './apps.interface';
import { DatabaseConfig } from './database.interface';
import { JWTConfig } from './jwt.interface';
import { LoggerConfig } from './logger.interface';
import { EmailServiceConfig } from './mailer.interface';

export interface IConfig
  extends AppsConfig,
    DatabaseConfig,
    JWTConfig,
    LoggerConfig,
    EmailServiceConfig {}
