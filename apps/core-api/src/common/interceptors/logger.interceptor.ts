import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();

    const ip = this.getIP(request);
    this.logger.log(`Incoming Request on ${request.path} method=${request.method} ip=${ip}`);
    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path} method=${request.method} ip=${ip} duration=${Date.now() - now}ms`,
        );
      }),
    );
  }

  private getIP(request: FastifyRequest): string {
    let ip: string;
    const ipAddr = request.headers['x-forwarded-for'];
    if (ipAddr) {
      const list = ipAddr instanceof String ? ipAddr.split(',') : ipAddr;
      ip = list[list.length - 1];
    } else {
      ip = request.connection.remoteAddress;
    }
    return ip.replace('::ffff:', '');
  }
}
