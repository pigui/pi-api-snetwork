import { Injectable, Logger } from '@nestjs/common';
import { CommentRepository } from '../../../application/repositories/comment.repository';
import { InjectModel } from '@nestjs/mongoose';
import { CommentEntity } from '../entities/comment.entity';
import { FilterQuery, Model, Types } from 'mongoose';
import { CommentMapper } from '../mappers/comment.mapper';
import { Observable, from, map, switchMap, toArray } from 'rxjs';
import { Comment } from '../../../application/entities/comment';

@Injectable()
export class CommentRepositoryImpl implements CommentRepository {
  private readonly logger = new Logger(CommentRepository.name);
  constructor(
    @InjectModel(CommentEntity.name)
    private readonly commentModel: Model<CommentEntity>,
    private readonly commentMapper: CommentMapper
  ) {}

  create(comment: Comment): Observable<Comment> {
    const entity = this.commentMapper.toPersistence(comment);
    const model = new this.commentModel(entity);
    return from(model.save()).pipe(
      map((newComment) => {
        return this.commentMapper.toDomain(newComment.toJSON());
      })
    );
  }

  find(filterQuery: FilterQuery<CommentEntity>): Observable<Array<Comment>> {
    this.logger.log('find');
    const entities = this.commentModel
      .find(filterQuery)
      .sort({ createdAt: -1 })
      .lean<Array<CommentEntity>>();
    return from(entities).pipe(
      switchMap((comments: Array<CommentEntity>) =>
        from(comments).pipe(
          map((comment) => this.commentMapper.toDomain(comment)),
          toArray()
        )
      )
    );
  }
  findById(id: string): Observable<Comment> {
    this.logger.log('findById', id);
    const entity = this.commentModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean();
    return from(entity).pipe(
      map((comment) => {
        if (!comment) {
          return null;
        }
        return this.commentMapper.toDomain(comment);
      })
    );
  }
  findByUserId(userId: string): Observable<Array<Comment>> {
    this.logger.log('findByUserId', userId);
    const entity = this.commentModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean();

    return from(entity).pipe(
      switchMap((comments: Array<CommentEntity>) =>
        from(comments).pipe(
          map((comment) => this.commentMapper.toDomain(comment)),
          toArray()
        )
      )
    );
  }
  findByPost(postId: string): Observable<Array<Comment>> {
    this.logger.log('findByPost', postId);
    const entity = this.commentModel
      .find({ postId: new Types.ObjectId(postId) })
      .lean();

    return from(entity).pipe(
      switchMap((comments: Array<CommentEntity>) =>
        from(comments).pipe(
          map((comment) => this.commentMapper.toDomain(comment)),
          toArray()
        )
      )
    );
  }
  deleteById(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  delete(comment: Comment): Observable<void> {
    throw new Error('Method not implemented.');
  }
  deleteByUserId(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  deleteByPostId(id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
