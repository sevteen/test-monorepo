import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ZodError } from 'zod';
@Catch(ZodError)
export class ValidationFilter implements ExceptionFilter<ZodError> {
  catch(exception: ZodError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(400).send({ code: 400, errors: exception.errors });
  }
}
