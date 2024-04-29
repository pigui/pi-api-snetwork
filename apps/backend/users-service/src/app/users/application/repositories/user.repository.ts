import { Observable } from 'rxjs';
import { User } from '../entities/user';
import { FilterQuery } from 'mongoose';
import { UserEntity } from '../../infraestructure/mongo/entities/user.entity';

export abstract class UserRepository {
  abstract create(user: User): Observable<User | null>;
  abstract addPassword(user: User, password: string): Observable<User | null>;
  abstract find(filterQuery: FilterQuery<UserEntity>): Observable<Array<User>>;
  abstract findById(id: string): Observable<User | null>;
  abstract findByEmail(email: string): Observable<User | null>;
}
