import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationRepository } from '../../../application/repositories/authentication.repository';
import {
  Observable,
  catchError,
  concatMap,
  forkJoin,
  from,
  iif,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { User } from '@app/shared/entities';
import { RefreshTokenStorage } from '../refresh-token-storage/refresh-token-storage';
import { GenerateIdService } from '@app/shared/util/generate-id';

@Injectable()
export class AuthenticationRepositoryImpl implements AuthenticationRepository {
  private readonly logger = new Logger(AuthenticationRepository.name);
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenStorage: RefreshTokenStorage,
    private readonly generateIdService: GenerateIdService
  ) {}

  sign(user: User): Observable<{ accessToken: string; refreshToken: string }> {
    this.logger.log('sign', user);
    return this.generateTokens(user);
  }

  refreshToken(
    token: string,
    user: User
  ): Observable<{ accessToken: string; refreshToken: string }> {
    this.logger.log('refreshToken', token);
    return from(
      this.jwtService.verifyAsync<{ refreshTokenId: string; sub: string }>(
        token,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        }
      )
    ).pipe(
      switchMap(({ sub, refreshTokenId }) => {
        return iif(
          () => sub === user.id,
          this.refreshTokenStorage.validate(user.id, refreshTokenId).pipe(
            concatMap((isValid) => {
              return iif(
                () => isValid,
                this.generateTokens(user),
                throwError(() => new UnauthorizedException())
              );
            })
          ),
          throwError(() => new UnauthorizedException())
        );
      })
    );
  }

  verify(accessToken: string): Observable<string> {
    return from(
      this.jwtService.verifyAsync<{ sub: string }>(accessToken, {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
      })
    ).pipe(
      map((payload) => payload.sub),
      catchError(() => of(null))
    );
  }

  private generateTokens(user: User): Observable<{
    accessToken: string;
    refreshToken: string;
  }> {
    this.logger.log('generateTokens', user);
    const refreshTokenId: string = this.generateIdService.generate();
    return forkJoin([
      this.signToken<Partial<{ email: string }>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email }
      ),
      this.signToken(user.id, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]).pipe(
      concatMap(([accessToken, refreshToken]: [string, string]) => {
        return this.refreshTokenStorage.insert(user.id, refreshTokenId).pipe(
          map(() => {
            return { accessToken, refreshToken };
          })
        );
      })
    );
  }

  private signToken<T>(
    userId: string,
    expiresIn: number,
    payload?: T
  ): Observable<string> {
    this.logger.log('signToken', userId);
    return from(
      this.jwtService.signAsync(
        {
          sub: userId,
          ...payload,
        },
        {
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
          secret: this.jwtConfiguration.secret,
          expiresIn,
        }
      )
    );
  }
}
