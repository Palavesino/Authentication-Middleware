import { Module } from '@nestjs/common';
import { databaseProviders } from './config/database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { ModulesModule } from './module/module.modules';
import { HttpExceptionFilter } from './common/exceptions/http-exeception.filter';

@Module({
  imports: [TypeOrmModule.forRoot(databaseProviders), ModulesModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule {}