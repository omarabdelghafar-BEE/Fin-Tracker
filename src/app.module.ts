import * as dotenv from 'dotenv';
dotenv.config(); // Loads .env into process.env immediately
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './Entities/user.entity';
import { Transaction } from './Entities/transaction.entity';
import { Session } from './Entities/session.entity';
import { Job } from './Entities/job.entity';
import { Category } from './Entities/category.entity';
import { Budget } from './Entities/budget.entity';
import { AuthToken } from './Entities/authToken.entity';
import { AuthTokenModule } from './auth-token/auth-token.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [UserModule, 
    PostModule, 
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`
  }), 
  AuthModule, 
  TypeOrmModule.forRootAsync({
    useFactory: () =>({
      type: 'postgres',
      entities: [User, Transaction, Session, Job, Category, Budget, AuthToken],
      synchronize: true,
      host: 'localhost',
      port: 5432,
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: 'TutorialNest'
    })
  }), AuthTokenModule, SessionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}