import { Module } from '@nestjs/common';
import { MongoInfraestructureModule } from './mongo/mongo-infraestructure.module';

@Module({
  imports: [MongoInfraestructureModule],
  exports: [MongoInfraestructureModule],
})
export class UsersInfraestructureModule {}
