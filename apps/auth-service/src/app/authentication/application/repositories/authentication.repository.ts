import { User } from '@app/shared/entities';
import { Observable } from 'rxjs';

export abstract class AuthenticationRepository {
  abstract sign(
    user: User
  ): Observable<{ accessToken: string; refreshToken: string }>;
  abstract refreshToken(
    token: string,
    user: User
  ): Observable<{ accessToken: string; refreshToken: string }>;
  abstract verify(accessToken: string): Observable<string>;
}
