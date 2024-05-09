import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../../application/repositories/user.repository';
import { Observable, from, iif, map, of, switchMap, toArray } from 'rxjs';
import { User } from '../../../application/entities/user';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { HashingService } from '@app/shared/util/hashing';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
    private readonly hashingService: HashingService,
    private readonly userMapper: UserMapper
  ) {}
  create(user: User): Observable<User> {
    this.logger.log('create', user);
    const entity = this.userMapper.toPersistence(user);
    const model = new this.userModel<UserEntity>(entity);

    return from(model.save()).pipe(
      map((newUser) => {
        return this.userMapper.toDomain(newUser.toJSON());
      })
    );
  }

  addPassword(user: User, password: string): Observable<User> {
    this.logger.log('addPassword', user);
    return from(this.hashingService.hash(password)).pipe(
      switchMap((hashPassword: string) =>
        from(
          this.userModel
            .findOneAndUpdate<UserEntity>(
              { _id: new Types.ObjectId(user.id) },
              { password: hashPassword },
              { new: true }
            )
            .lean<UserEntity>()
        ).pipe(
          map(() => {
            return user;
          })
        )
      )
    );
  }

  find(filterQuery: FilterQuery<UserEntity>): Observable<Array<User>> {
    this.logger.log('find');
    const entities = this.userModel.find(filterQuery).lean<Array<UserEntity>>();
    return from(entities).pipe(
      switchMap((users: Array<UserEntity>) => {
        return from(users).pipe(
          map((user) => this.userMapper.toDomain(user)),
          toArray()
        );
      })
    );
  }

  findById(id: string): Observable<User | null> {
    this.logger.log('findById', id);
    return from(
      this.userModel.findOne({ _id: new Types.ObjectId(id) }).lean()
    ).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return this.userMapper.toDomain(user);
      })
    );
  }

  findByEmail(email: string): Observable<User | null> {
    this.logger.log('findByEmail', email);
    return from(this.userModel.findOne({ email }).lean()).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return this.userMapper.toDomain(user);
      })
    );
  }

  getPassword(user: User): Observable<string> {
    this.logger.log('getPassword', user);
    return from(
      this.userModel
        .findOne({ _id: new Types.ObjectId(user.id) })
        .lean<UserEntity>()
    ).pipe(map((currentUser: UserEntity) => currentUser.password || null));
  }

  comparePassword(user: User, password: string): Observable<boolean> {
    this.logger.log('comparePassword', user);

    return from(
      this.userModel
        .findOne<UserEntity>({ _id: new Types.ObjectId(user.id) })
        .lean<UserEntity>()
    ).pipe(
      switchMap((userDatabase) => {
        return iif(
          () => !!userDatabase,
          from(
            this.hashingService.compare(password, userDatabase?.password || '')
          ),
          of(false)
        );
      })
    );
  }
}
