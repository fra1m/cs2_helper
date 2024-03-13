import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from '@entities/Post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    TypeOrmModule.forFeature([PostEntity]), // Регистрируйте PostEntity в TypeOrmModule
  ],
})
export class PostsModule {}
