import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as moongose from 'mongoose';
import { UUID } from 'mongodb';

export type UserDocument = moongose.HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
  @Prop({
    type: moongose.Schema.Types.UUID,
    default: new UUID(),
  })
  _id: UUID;

  @Prop({ unique: true })
  email: string;

  @Prop({ isRequired: false })
  password?: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  googleId?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
