import { Module, Global } from '@nestjs/common';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { EnvironmentConfigModule } from './infrastructure/config/environment/environment-config.module';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
