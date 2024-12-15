import { UserRole } from '@app/shared/entities';
import { Injectable, Logger } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { User } from '../../../application/entities/user';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserMapper {
  private readonly logger = new Logger(UserMapper.name);
  toDomain(entity: UserEntity): User {
    this.logger.log('toDomain', entity);
    return new User(
      entity._id.toString(),
      entity.email,
      entity.firstName,
      entity.lastName,
      new UserRole(entity.isAdmin ? 'admin' : 'user'),
      entity.createdAt,
      entity.updatedAt
    );
  }

  toPersistence(domain: User): UserEntity {
    this.logger.log('toPersistence', domain);
    const entity = new UserEntity();
    entity._id = new ObjectId(domain.id);
    entity.email = domain.email;
    entity.firstName = domain.firstName;
    entity.lastName = domain.firstName;
    entity.isAdmin = domain.role.equals(new UserRole('admin'));
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;

    return entity;
  }
}
