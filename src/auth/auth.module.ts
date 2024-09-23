import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../shared/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../shared/config/env.config';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
