import { Module } from '@nestjs/common';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenController } from './auth-token.controller';

@Module({
  providers: [AuthTokenService],
  controllers: [AuthTokenController]
})
export class AuthTokenModule {}
