import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as moongose from 'mongoose';

export type PostDocument = moongose.HydratedDocument<PostEntity>;

@Schema()
export class PostEntity {
  @Prop({ type: moongose.Types.ObjectId })
  _id: moongose.Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  userId: moongose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(PostEntity);
