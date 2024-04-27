import { Observable } from 'rxjs';
import { User } from '../entities/user';

export abstract class UserRepository {
  abstract create(user: User): Observable<User | null>;
  abstract addPassword(user: User, password: string): Observable<User | null>;
  abstract findById(id: string): Observable<User | null>;
  abstract findByEmail(email: string): Observable<User | null>;
}
