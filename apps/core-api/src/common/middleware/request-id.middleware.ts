import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    const requestId = uuid();
    req.headers['x-request-id'] = requestId;
    next();
  }
}
