import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { Logger } from 'winston';
import { SERVICE_NAME } from '../../common';
import { ILogger } from './logger.interface';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService implements ILogger {
  constructor(
    private readonly logger: Logger,
    @Inject(REQUEST) private readonly request: FastifyRequest,
    @Inject(SERVICE_NAME) private readonly serviceName: string,
  ) {}

  private createMeta(...meta: any) {
    return {
      ...meta,
      requestId: this.request.headers['x-request-id'] || 'N/A',
      serviceName: this.serviceName || 'core-api-global',
    };
  }

  debug(message: string, ...meta: any) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.debug(`[DEBUG] ${message}`, this.createMeta(meta));
    }
  }

  info(message: string, ...meta: any) {
    if (process.env.NODE_ENV === 'production') {
      this.logger.info(`[INFO] ${message}`, this.createMeta(meta));
    }
  }

  log(message: string, ...meta: any) {
    console.log(`[LOG] ${message}`, this.createMeta(meta));
  }

  error(message: string, ...meta: any) {
    this.logger.error(`[ERROR] ${message}`, this.createMeta(meta));
  }

  warn(message: string, ...meta: any) {
    this.logger.warn(`[WARN] ${message}`, this.createMeta(meta));
  }

  verbose(message: string, ...meta: any) {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.verbose(`[VERBOSE] ${message}`, this.createMeta(meta));
    }
  }
}
