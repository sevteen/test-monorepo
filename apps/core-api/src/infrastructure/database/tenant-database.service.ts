import { Injectable, Scope } from '@nestjs/common';
import { EnvironmentConfigService } from '../config/environment/environment-config.service';
import { Sequelize } from 'sequelize';

@Injectable({ scope: Scope.REQUEST })
export class TenantDataBaseService {
  private tenantConnections: { [key: string]: Sequelize } = {};

  constructor(private environmentConfig: EnvironmentConfigService) {}

  getTenantConnection(tenantId: string, host: string, schemaName: string, dbName: string): Sequelize {
    if (!this.tenantConnections[tenantId]) {
      const sequelize = new Sequelize({
        ...this.environmentConfig.getDatabaseConfig().tenant,
        host,
        database: dbName,
        schema: schemaName,
      });

      this.tenantConnections[tenantId] = sequelize;
    }

    return this.tenantConnections[tenantId];
  }
}
