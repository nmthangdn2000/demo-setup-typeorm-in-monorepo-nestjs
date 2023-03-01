import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '.env').replace('/dist', '')],
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
  providers: [],
  exports: [],
})
export class CoreModule {}
