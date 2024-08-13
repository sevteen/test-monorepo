import { NestHttpExceptionFilter } from '@common/filters/NestHttpExceptionFilter';
import { LoggerInterceptor } from '@common/interceptors/logger.interceptor';
import { RequestIdMiddleware } from '@common/middleware/request-id.middleware';
import { EnvironmentConfigModule } from '@infrastructure/config/environment/environment-config.module';
import { LoggerModule } from '@infrastructure/logger/logger.module';
import { Global, MiddlewareConsumer, Module, NestModule, OnApplicationBootstrap, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

const providers: Provider[] = [
  {
    provide: APP_FILTER,
    useClass: NestHttpExceptionFilter,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  },
];

@Global()
@Module({
  imports: [EnvironmentConfigModule, LoggerModule.forRoot()],
  providers: providers,
  exports: [],
})
export class InfrastructureModule implements OnApplicationBootstrap, NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }

  onApplicationBootstrap(): void {
    //
  }
}
