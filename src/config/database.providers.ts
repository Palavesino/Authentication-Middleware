import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envConfig } from './envs';

export const databaseProviders: TypeOrmModuleOptions = {
  type: 'postgres',
  host: envConfig.HOST,
  port: envConfig.DB_PORT,
  database: envConfig.DB_NAME,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  autoLoadEntities: true,
  synchronize: true, 
  logging: envConfig.NODE_ENV !== 'production',
  
  ssl: {
    rejectUnauthorized: false 
  },
  
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};