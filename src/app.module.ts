import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomErrorFilter } from './shared/errors/error-handler';
import { UserModule } from './user/user.module';
import { AuthGuard } from './shared/guards/auth.gaurd';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggingInterceptor } from './logger.interceptor';
import { BullModule } from '@nestjs/bullmq';
import { EmailModule } from './email/email.module';
import { config } from './shared/config/env.config';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PrometheusModule.register(),
    BullModule.forRootAsync({
      useFactory: () => {
        return {
          connection: {
            host: config.REDIS.HOST,
            port: config.REDIS.PORT,
            password: config.REDIS.PASSWORD,
            username: config.REDIS.USERNAME,
          },
        };
      },
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },

    AppService,
  ],
})
export class AppModule {}
