import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Observable, from, iif, map, of, switchMap, throwError } from 'rxjs';
import { InvalidatedRefreshTokenError } from './exceptions/invalidate-refresh.exception';

@Injectable()
export class RefreshTokenStorage {
  constructor(private readonly redis: Redis) {}

  insert(userId: string, tokenId: string) {
    return from(this.redis.set(this.getKey(userId), tokenId));
  }

  invalidate(userId: string): Observable<void> {
    return from(this.redis.del(this.getKey(userId))).pipe(
      map(() => {
        return;
      })
    );
  }

  validate(userId: string, tokenId: string): Observable<boolean> {
    return from(this.redis.get(this.getKey(userId))).pipe(
      switchMap((storeId) => {
        return iif(
          () => storeId === tokenId,
          of(true),
          throwError(() => new InvalidatedRefreshTokenError()).pipe(
            map(() => false)
          )
        );
      })
    );
  }

  private getKey(id: string): string {
    return `user-${id}`;
  }
}
