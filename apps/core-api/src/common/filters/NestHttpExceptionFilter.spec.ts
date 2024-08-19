import { ApiResponse } from '@common/api/ApiResponse';
import { StatusCode } from '@common/status/Status';
import { ArgumentsHost, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { NestHttpExceptionFilter } from './NestHttpExceptionFilter';

describe('GlobalExceptionFilter', () => {
  let exceptionFilter: NestHttpExceptionFilter;
  let mockLogger: LoggerService;
  let mockReply: FastifyReply;
  let mockRequest: FastifyRequest;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn(),
      warn: jest.fn(),
    } as unknown as LoggerService;

    mockReply = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as FastifyReply;

    mockRequest = {
      headers: { 'x-request-id': 'test-request-id' },
    } as unknown as FastifyRequest;

    exceptionFilter = new NestHttpExceptionFilter(mockLogger);
  });

  it('should handle general errors', () => {
    const exception = new Error('General error');
    const host = {
      switchToHttp: () => ({
        getResponse: () => mockReply,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;

    exceptionFilter.catch(exception, host);

    expect(mockReply.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR.code);
    expect(mockReply.send).toHaveBeenCalledWith(
      ApiResponse.error('test-request-id', StatusCode.INTERNAL_SERVER_ERROR.code, 'General error'),
    );
    expect(mockLogger.error).toHaveBeenCalled();
  });

  // it('should handle Zod errors', () => {
  //   const zodError = new ZodError([{ code: 'invalid_type', message: 'Invalid type', path: ['name'] }]);
  //   const host = {
  //     switchToHttp: () => ({
  //       getResponse: () => mockReply,
  //       getRequest: () => mockRequest,
  //     }),
  //   } as unknown as ArgumentsHost;

  //   exceptionFilter.catch(zodError, host);

  //   expect(mockReply.status).toHaveBeenCalledWith(StatusCode.USER_INPUT_VALIDATION_ERROR.code);
  //   expect(mockReply.send).toHaveBeenCalledWith(
  //     ApiResponse.error(
  //       'test-request-id',
  //       StatusCode.USER_INPUT_VALIDATION_ERROR.code,
  //       StatusCode.USER_INPUT_VALIDATION_ERROR.message,
  //       [{ code: 'invalid_type', message: 'Invalid type', detail: 'name' }],
  //     ),
  //   );
  //   expect(mockLogger.error).toHaveBeenCalled();
  // });

  it('should handle HttpException', () => {
    const exception = new HttpException('HttpException message', HttpStatus.BAD_REQUEST);
    const host = {
      switchToHttp: () => ({
        getResponse: () => mockReply,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;

    exceptionFilter.catch(exception, host);

    expect(mockReply.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockReply.send).toHaveBeenCalledWith(
      ApiResponse.error('test-request-id', HttpStatus.BAD_REQUEST, 'HttpException message'),
    );
    expect(mockLogger.error).toHaveBeenCalled();
  });

  it('should handle UnauthorizedException', () => {
    const exception = new UnauthorizedException('Unauthorized');
    const host = {
      switchToHttp: () => ({
        getResponse: () => mockReply,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;

    exceptionFilter.catch(exception, host);

    expect(mockReply.status).toHaveBeenCalledWith(StatusCode.UNAUTHORIZED_ERROR.code);
    expect(mockReply.send).toHaveBeenCalledWith(
      ApiResponse.error('test-request-id', StatusCode.UNAUTHORIZED_ERROR.code, StatusCode.UNAUTHORIZED_ERROR.message),
    );
    expect(mockLogger.error).toHaveBeenCalled();
  });

  // it('should handle CoreException', () => {
  //   const exception = new CoreException('CoreException message', 123, { additional: 'data' });
  //   const host = {
  //     switchToHttp: () => ({
  //       getResponse: () => mockReply,
  //       getRequest: () => mockRequest,
  //     }),
  //   } as unknown as ArgumentsHost;

  //   exceptionFilter.catch(exception, host);

  //   expect(mockReply.status).toHaveBeenCalledWith(123);
  //   expect(mockReply.send).toHaveBeenCalledWith(
  //     ApiResponse.error('test-request-id', 123, 'CoreException message', { additional: 'data' }),
  //   );
  //   expect(mockLogger.error).toHaveBeenCalled();
  // });
});
