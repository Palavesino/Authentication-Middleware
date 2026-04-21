// app.module.ts
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { databaseProviders } from './config/database.providers';
import { ModulesModule } from './modules/module.modules';
import { HttpExceptionFilter } from './common/exceptions/http-exeception.filter';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { AuthToken } from './domain/entities/auth-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseProviders),
    TypeOrmModule.forFeature([AuthToken]),  
    JwtModule.register({ 
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    ModulesModule,
  ],
  exports: [JwtModule], 
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'api/user/login', method: RequestMethod.POST },
        { path: 'api/user/register', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}