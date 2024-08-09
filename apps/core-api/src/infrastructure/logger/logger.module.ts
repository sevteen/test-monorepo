import { EnvironmentConfigModule } from './../config/environment/environment-config.module';
import { DynamicModule, Global, Module } from '@nestjs/common';
import winston, { createLogger, Logger, LoggerOptions } from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { SERVICE_NAME } from '../../common';
import { EnvironmentConfigService } from './../config/environment/environment-config.service';
import { LoggerService } from './logger.service';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(): DynamicModule {
    return {
      imports: [EnvironmentConfigModule],
      module: LoggerModule,
      providers: [
        {
          provide: Logger,
          inject: [EnvironmentConfigService],
          useFactory(configService: EnvironmentConfigService) {
            const esTransport = new ElasticsearchTransport(configService.getEsTransportOptions());

            const loggerOptions: LoggerOptions = {
              level: 'info',
              format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
              transports: [
                new winston.transports.Console({
                  format: winston.format.combine(
                    winston.format.colorize({
                      all: true,
                    }),
                    winston.format.label({
                      label: '[LOGGER]',
                    }),
                    winston.format.timestamp({
                      format: 'YY-MM-DD HH:mm:ss',
                    }),
                    winston.format.align(),
                    winston.format.json(),
                    winston.format.printf(
                      (info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`,
                    ),
                  ),
                }),
                esTransport,
              ],
            };
            const logger = createLogger(loggerOptions);

            logger.debug(`Log initialized`);

            return logger;
          },
        },
        LoggerService,
        {
          provide: SERVICE_NAME,
          useValue: undefined,
        },
      ],
      exports: [LoggerService],
    };
  }

  static forFeature(serviceName: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        LoggerService,
        {
          provide: SERVICE_NAME,
          useValue: serviceName,
        },
      ],
      exports: [LoggerService],
    };
  }
}
