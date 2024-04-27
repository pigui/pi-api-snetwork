import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../application/repositories/user.repository';
import { Observable, from, map, switchMap } from 'rxjs';
import { User } from '../../../application/entities/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashingService } from '@app/backend/shared/util/hashing';
import { UserMapper } from '../mappers/user.mapper';
import { UserEntity } from '../entities/user.entity';
import { UUID } from 'mongodb';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>,
    private readonly hashingService: HashingService,
    private readonly userMapper: UserMapper
  ) {}

  create(user: User): Observable<User> {
    const entity = this.userMapper.toPersistence(user);
    const model = new this.userModel<UserEntity>(entity);

    return from(model.save()).pipe(
      map((newUser) => this.userMapper.toDomain(newUser.toJSON()))
    );
  }

  addPassword(user: User, password: string): Observable<User> {
    const entity = this.userMapper.toPersistence(user);
    return from(this.hashingService.hash(password)).pipe(
      switchMap((hashPassword: string) =>
        from(
          this.userModel
            .findByIdAndUpdate(
              { _id: entity._id },
              { $set: { password: hashPassword } },
              { new: true }
            )
            .lean<UserEntity>()
        ).pipe(
          map((updateUser: UserEntity) => this.userMapper.toDomain(updateUser))
        )
      )
    );
  }

  findById(id: string): Observable<User | null> {
    return from(this.userModel.findById(id)).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return this.userMapper.toDomain(user);
      })
    );
  }

  findByEmail(email: string): Observable<User | null> {
    return from(this.userModel.findOne({ email })).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return this.userMapper.toDomain(user);
      })
    );
  }
}
