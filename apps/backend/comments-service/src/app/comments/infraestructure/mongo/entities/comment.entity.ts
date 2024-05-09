import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as moongose from 'mongoose';

export type CommentDocument = moongose.HydratedDocument<CommentEntity>;

@Schema()
export class CommentEntity {
  @Prop({ type: moongose.Types.ObjectId })
  _id: moongose.Types.ObjectId;

  @Prop()
  content: string;

  @Prop()
  userId: moongose.Types.ObjectId;

  @Prop()
  postId: moongose.Types.ObjectId;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(CommentEntity);
