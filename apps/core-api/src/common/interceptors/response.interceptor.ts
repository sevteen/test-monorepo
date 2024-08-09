import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class ResponseFormat<T> {
  duration: string;
  data: T;
  message: string;
  code: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<FastifyReply>();

    return next.handle().pipe(
      map((data) => ({
        data,
        duration: `${Date.now() - now}ms`,
        message: HttpStatus[response.statusCode],
        code: response.statusCode,
      })),
    );
  }
}
