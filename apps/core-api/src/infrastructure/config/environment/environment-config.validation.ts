import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Local = 'local',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  JWT_SECRET: string;
  @IsNumber()
  JWT_ACCESS_TIME: number;
  @IsString()
  JWT_CONFIRMATION_SECRET: string;
  @IsNumber()
  JWT_CONFIRMATION_TIME: number;
  @IsString()
  JWT_RESET_PASSWORD_SECRET: string;
  @IsNumber()
  JWT_RESET_PASSWORD_TIME: number;
  @IsString()
  JWT_REFRESH_SECRET: string;
  @IsNumber()
  JWT_REFRESH_TIME: number;

  //Database Validation

  @IsString()
  DATABASE_SYSTEM_HOST: string;
  @IsNumber()
  DATABASE_SYSTEM_PORT: number;
  @IsString()
  DATABASE_SYSTEM_USER: string;
  @IsString()
  DATABASE_SYSTEM_PASSWORD: string;
  @IsString()
  DATABASE_SYSTEM_NAME: string;
  @IsString()
  DATABASE_SYSTEM_SCHEMA: string;
  @IsBoolean()
  DATABASE_SYSTEM_SYNCHRONIZE: boolean;

  @IsString()
  DATABASE_TENANT_HOST: string;
  @IsNumber()
  DATABASE_TENANT_PORT: number;
  @IsString()
  DATABASE_TENANT_USER: string;
  @IsString()
  DATABASE_TENANT_PASSWORD: string;
  @IsString()
  DATABASE_TENANT_NAME: string;
  @IsString()
  DATABASE_TENANT_SCHEMA: string;
  @IsBoolean()
  DATABASE_TENANT_SYNCHRONIZE: boolean;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
