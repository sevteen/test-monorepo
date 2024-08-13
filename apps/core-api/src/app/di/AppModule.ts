import { Module } from '@nestjs/common';
import { InfrastructureModule } from './InfrastructureModule';

@Module({
  imports: [InfrastructureModule],
})
export class AppModule {}
