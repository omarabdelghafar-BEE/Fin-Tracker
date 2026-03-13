import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthToken } from 'src/Entities/authToken.entity';
import { AuthTokenService } from 'src/auth-token/auth-token.service';
import { Session } from 'src/Entities/session.entity';
import { MailService } from 'src/mail/mail.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthTokenService, MailService],
  exports: [AuthService],
  imports: [forwardRef(() => UserModule), TypeOrmModule.forFeature([AuthToken]),TypeOrmModule.forFeature([Session])]
})
export class AuthModule {}
