import { ElasticsearchTransportOptions } from 'winston-elasticsearch';

export interface LoggerConfig {
  getEsTransportOptions(): ElasticsearchTransportOptions;
}
