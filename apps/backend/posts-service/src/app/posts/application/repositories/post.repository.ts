import { Observable } from 'rxjs';
import { Post } from '../entities/post';
import { FilterQuery } from 'mongoose';
import { PostEntity } from '../../infraestructure/mongo/entities/post.entity';

export abstract class PostRepository {
  abstract find(filterQuery: FilterQuery<PostEntity>): Observable<Array<Post>>;
  abstract findById(id: string): Observable<Post | null>;
  abstract findByUserId(userId: string): Observable<Array<Post>>;
  abstract create(post: Post): Observable<Post>;
  abstract deleteById(id: string): Observable<void>;
  abstract deletePost(post: Post): Observable<void>;
  abstract deleteByUserId(userId: string): Observable<void>;
}
