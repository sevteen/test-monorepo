import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { EnvironmentConfigService } from '../config/environment/environment-config.service';

@Injectable()
export class SystemDataBaseService {
  public sequelize: Sequelize;

  constructor(private environmentConfig: EnvironmentConfigService) {
    this.sequelize = new Sequelize({
      ...this.environmentConfig.getDatabaseConfig().system,
    });
  }
}
