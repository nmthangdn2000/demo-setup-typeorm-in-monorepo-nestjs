import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({
  path: join(__dirname, '../../.env'),
});

const dataSources: DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  migrationsRun: true,
  entities: [join(__dirname + '../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '../../database/migrations/*{.ts,.js}')],
  synchronize: false,
  logging: true,
});

export default dataSources;
