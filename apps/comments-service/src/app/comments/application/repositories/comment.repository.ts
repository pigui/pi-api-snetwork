import { FilterQuery } from 'mongoose';
import { Observable } from 'rxjs';
import { CommentEntity } from '../../infraestructure/mongo/entities/comment.entity';
import { Comment } from '../entities/comment';

export abstract class CommentRepository {
  abstract find(
    filterQuery: FilterQuery<CommentEntity>
  ): Observable<Array<Comment>>;
  abstract findById(id: string): Observable<Comment | null>;
  abstract findByUserId(userId: string): Observable<Array<Comment>>;
  abstract findByPost(postId: string): Observable<Array<Comment>>;
  abstract create(comment: Comment): Observable<Comment>;
  abstract deleteById(id: string): Observable<void>;
  abstract delete(comment: Comment): Observable<void>;
  abstract deleteByUserId(id: string): Observable<void>;
  abstract deleteByPostId(id: string): Observable<void>;
}
