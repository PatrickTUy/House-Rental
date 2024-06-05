import { ConfigService } from '@nestjs/config';
import { Neo4jConfig } from './neo4j.config.interface';

export const createDatabaseConfig = (
  configService: ConfigService,
  customConfig?: Neo4jConfig,
): Neo4jConfig =>
  customConfig || {
    host: configService.get<string>('DB_HOST'),
    password: configService.get<string>('DB_PASSWORD'),
    port: configService.get<string>('DB_PORT'),
    scheme: configService.get<any>('DB_SCHEME'),
    username: configService.get<string>('DB_USERNAME'),
  };

export class ConnectionError extends Error {
  public details: string;
  constructor(oldError: Error) {
    super();
    this.message = 'FAILED TO CONNECT TO NEO4J DATABASE';
    this.name = 'CONNECTION ERROR';
    this.stack = oldError.stack;
    this.details = oldError.message;
  }
}
