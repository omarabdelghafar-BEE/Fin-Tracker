import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports:[UserModule]
})
export class PostModule {}
