import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/Entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/Entities/session.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Session])]
})
export class UserModule {}
