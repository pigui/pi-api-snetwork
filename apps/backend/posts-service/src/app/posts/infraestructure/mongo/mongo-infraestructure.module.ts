import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostEntity, PostSchema } from './entities/post.entity';
import { PostRepository } from '../../application/repositories/post.repository';
import { PostRepositoryImpl } from './repositories/post.repository';
import { PostMapper } from './mappers/post.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PostEntity.name, schema: PostSchema }]),
  ],
  providers: [{ provide: PostRepository, useClass: PostRepositoryImpl }],
  exports: [PostRepository, PostMapper],
})
export class MongoInfraestructureModule {}
