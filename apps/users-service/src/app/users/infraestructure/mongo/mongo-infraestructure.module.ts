import { Module } from '@nestjs/common';
import { UserRepository } from '../../application/repositories/user.repository';
import { UserRepositoryImpl } from './repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserSchema } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { HashingModule } from '@app/shared/util/hashing';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
    HashingModule,
  ],
  providers: [
    { provide: UserRepository, useClass: UserRepositoryImpl },
    UserMapper,
  ],
  exports: [UserRepository],
})
export class MongoInfraestructureModule {}
