import { Module } from '@nestjs/common';
import { SystemDataBaseService } from './system-database.service';
import { TenantDataBaseService } from './tenant-database.service';
import { EnvironmentConfigModule } from '../config/environment/environment-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [SystemDataBaseService, TenantDataBaseService],
  exports: [SystemDataBaseService, TenantDataBaseService],
})
export class DatabaseModule {}
