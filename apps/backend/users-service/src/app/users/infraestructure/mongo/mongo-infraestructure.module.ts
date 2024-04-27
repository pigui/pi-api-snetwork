import { Module } from '@nestjs/common';
import { UserRepository } from '../../application/repositories/user.repository';
import { UserRepositoryImpl } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '../../application/entities/user';
import { UserSchema } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { HashingModule } from '@app/backend/shared/util/hashing';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HashingModule,
  ],
  providers: [
    { provide: UserRepository, useClass: UserRepositoryImpl },
    UserMapper,
  ],
  exports: [UserRepository],
})
export class MongoInfraestructureModule {}
