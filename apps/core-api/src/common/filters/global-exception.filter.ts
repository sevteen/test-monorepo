import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class GlobalExceptionFilter<T = any> implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal Server Error';

    this.logMessage(request, message, status, exception);

    response.status(status).send({
      code: status,
      timestamp: new Date().toISOString(),
      message,
      url: request.url,
    });
  }

  private logMessage(request: FastifyRequest, message: string | object, status: number, exception: T) {
    if (status === 500) {
      this.logger.error(`End Request for ${request.url} method=${request.method} status=${status} message=${message}`);
    } else {
      this.logger.warn(`End Request for ${request.url} method=${request.method} status=${status} message=${message}`);
    }
  }
}
