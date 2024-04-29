import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as moongose from 'mongoose';

export type UserDocument = moongose.HydratedDocument<UserEntity>;

@Schema()
export class UserEntity {
  @Prop({ type: moongose.SchemaTypes.ObjectId })
  _id: moongose.Types.ObjectId;

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
