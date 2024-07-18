import { Dialect } from 'sequelize';

export interface DBConfig {
  system: {
    dialect: Dialect;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    schema: string;
  };
  tenant: {
    dialect: Dialect;
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    schema: string;
  };
}

export interface DatabaseConfig {
  getDatabaseConfig(): DBConfig;
}
