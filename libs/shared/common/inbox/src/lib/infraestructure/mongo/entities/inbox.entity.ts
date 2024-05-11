import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import * as moongose from 'mongoose';

export type InboxDocument = moongose.HydratedDocument<InboxEntity>;

@Schema()
export class InboxEntity {
  @Prop({ type: moongose.Types.ObjectId })
  _id: moongose.Types.ObjectId;

  @Prop()
  type: string;

  @Prop()
  target: string;

  @Prop({ enum: ['pending', 'processed'], default: 'pending' })
  status: 'pending' | 'processed';

  @Prop({ type: moongose.Types.Map })
  payload: Record<string, unknown>;

  @Prop()
  createdAt: Date;
}

export const InboxSchema = SchemaFactory.createForClass(InboxEntity);
