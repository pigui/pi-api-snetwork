import { FilterQuery } from 'mongoose';
import { Observable } from 'rxjs';
import { UserEntity } from '../../infraestructure/mongo/entities/user.entity';
import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Observable<User | null>;
  abstract addPassword(user: User, password: string): Observable<User | null>;
  abstract find(filterQuery: FilterQuery<UserEntity>): Observable<Array<User>>;
  abstract findById(id: string): Observable<User | null>;
  abstract findByEmail(email: string): Observable<User | null>;
  abstract getPassword(user: User): Observable<string | null>;
  abstract comparePassword(user: User, password: string): Observable<boolean>;
  abstract delete(user: User): Observable<User | null>;
  abstract softdelete(user: User): Observable<User | null>;
}
