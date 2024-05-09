import { Injectable, Logger } from '@nestjs/common';
import { PostRepository } from '../../../application/repositories/post.repository';
import { EMPTY, Observable, from, map, switchMap, toArray } from 'rxjs';
import { Post } from '../../../application/entities/post';
import { InjectModel } from '@nestjs/mongoose';
import { PostEntity } from '../entities/post.entity';
import { FilterQuery, Model, Types } from 'mongoose';
import { PostMapper } from '../mappers/post.mapper';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  private readonly logger = new Logger(PostRepository.name);
  constructor(
    @InjectModel(PostEntity.name) private readonly postModel: Model<PostEntity>,
    private readonly postMapper: PostMapper
  ) {}

  create(post: Post): Observable<Post> {
    this.logger.log('create', post);
    const entity = this.postMapper.toPersistence(post);
    const model = new this.postModel<PostEntity>(entity);

    return from(model.save()).pipe(
      map((newPost) => {
        return this.postMapper.toDomain(newPost.toJSON());
      })
    );
  }

  find(filterQuery: FilterQuery<PostEntity>): Observable<Array<Post>> {
    this.logger.log('find');
    const entities = this.postModel
      .find(filterQuery)
      .sort({ createdAt: -1 })
      .lean<Array<PostEntity>>();
    return from(entities).pipe(
      switchMap((posts: Array<PostEntity>) =>
        from(posts).pipe(
          map((post) => this.postMapper.toDomain(post)),
          toArray()
        )
      )
    );
  }
  findById(id: string): Observable<Post | null> {
    this.logger.log('findById', id);
    const entity = this.postModel
      .findOne({ _id: new Types.ObjectId(id) })
      .lean<PostEntity>();

    return from(entity).pipe(
      map((post) => {
        if (!post) {
          return null;
        }
        return this.postMapper.toDomain(post);
      })
    );
  }
  findByUserId(userId: string): Observable<Array<Post>> {
    this.logger.log('findByUserId', userId);
    const entities = this.postModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean<Array<PostEntity>>();

    return from(entities).pipe(
      switchMap((posts: Array<PostEntity>) =>
        from(posts).pipe(
          map((post) => this.postMapper.toDomain(post)),
          toArray()
        )
      )
    );
  }

  deleteById(id: string): Observable<void> {
    const entity = this.postModel
      .deleteOne({ _id: new Types.ObjectId(id) })
      .lean();
    return from(entity).pipe(switchMap(() => EMPTY));
  }

  deleteByUserId(userId: string): Observable<void> {
    const entities = this.postModel
      .deleteMany({
        userId: new Types.ObjectId(userId),
      })
      .lean();
    return from(entities).pipe(switchMap(() => EMPTY));
  }

  deletePost(post: Post): Observable<void> {
    return this.deleteById(post.id);
  }
}
