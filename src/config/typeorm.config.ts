import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RES_PORT || dbConfig.port,
  database: process.env.RES_DATABASE || dbConfig.database,
  username: process.env.RES_USERNAME || dbConfig.username,
  password: process.env.RES_PASSWORD || dbConfig.password,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.RES_ASYNC || dbConfig.synchronize, //check & create or change table from you entities class
};