import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentEntity, CommentSchema } from './entities/comment.entity';
import { CommentMapper } from './mappers/comment.mapper';
import { CommentRepository } from '../../application/repositories/comment.repository';
import { CommentRepositoryImpl } from './repositories/comment.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentEntity.name, schema: CommentSchema },
    ]),
  ],
  providers: [
    { provide: CommentRepository, useClass: CommentRepositoryImpl },
    CommentMapper,
  ],
  exports: [CommentRepository],
})
export class MongoInfraestructureModule {}
