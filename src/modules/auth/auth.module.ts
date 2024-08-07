import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/database/database.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { OtpRepository } from './otp.repository';
import { UserRepository } from '../user/user.repository';
import { VerifyToken } from 'src/common/middlewares/verify-token.middleware';
import { ConfigService } from '@nestjs/config';
import { AgentRepository } from '../agent/agent.repository';
import { VerifyAgentToken } from 'src/common/middlewares/verify-agent-token-middleware';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("OTP_TOKEN_SECRET"),
      }),
      inject: [ConfigService],
      global: true,
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    PrismaService,
    TokenService,
    OtpRepository,
    UserRepository,
    AgentRepository
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyToken).forRoutes('*');
  }
  configureAgent(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyAgentToken).forRoutes('*');
  }
}
