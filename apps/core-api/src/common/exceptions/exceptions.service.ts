import { ArgumentsHost, ExceptionFilter, Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionsService implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    throw Error('error');
  }
}
