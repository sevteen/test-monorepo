import { ApiResponse } from '@common/api/ApiResponse';
import { CoreException } from '@common/exceptions/CoreException';
import { StatusCode } from '@common/status/Status';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { LoggerService } from '../../infrastructure/logger/logger.service';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const requestId = request.headers['x-request-id'] as string;

    let errorResponse: ApiResponse<unknown> = ApiResponse.error(
      requestId,
      StatusCode.INTERNAL_SERVER_ERROR.code,
      exception.message,
    );

    errorResponse = this.handleZodValidationError(exception, errorResponse, requestId);
    errorResponse = this.handleNestException(exception, errorResponse, requestId);

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException ? exception.getResponse() : 'Internal Server Error';

    // todo Log with Configuration
    this.logMessage(request, message, status, exception);

    response.status(status).send(errorResponse);
  }

  // Todo : Database Exceptions !!

  // Zod filter

  private handleZodValidationError(
    error: Error,
    errorResponse: ApiResponse<unknown>,
    requestId: string,
  ): ApiResponse<unknown> {
    if (error instanceof ZodError) {
      errorResponse = ApiResponse.error(
        requestId,
        StatusCode.USER_INPUT_VALIDATION_ERROR.code,
        StatusCode.USER_INPUT_VALIDATION_ERROR.message,
        error.errors.map((zod) => ({ code: zod.code, detail: zod.path.join(','), message: zod.message })),
      );
    }

    return errorResponse;
  }

  // Nest Error

  private handleNestException(
    error: Error,
    errorResponse: ApiResponse<unknown>,
    requestId: string,
  ): ApiResponse<unknown> {
    if (error instanceof HttpException) {
      const message =
        typeof error.getResponse() === 'string'
          ? (error.getResponse() as string)
          : StatusCode.INTERNAL_SERVER_ERROR.message;
      errorResponse = ApiResponse.error(requestId, error.getStatus(), message, null);
    }
    if (error instanceof UnauthorizedException) {
      errorResponse = ApiResponse.error(
        requestId,
        StatusCode.UNAUTHORIZED_ERROR.code,
        StatusCode.UNAUTHORIZED_ERROR.message,
        null,
      );
    }
    if (error instanceof CoreException) {
      errorResponse = ApiResponse.error(requestId, error.code, error.message, error.data);
    }
    return errorResponse;
  }

  private logMessage(request: FastifyRequest, message: string | object, status: number, exception: Error) {
    if (status === 500) {
      this.logger.error(`End Request for ${request.url} method=${request.method} status=${status} message=${message}`);
    } else {
      this.logger.warn(`End Request for ${request.url} method=${request.method} status=${status} message=${message}`);
    }
  }
}
