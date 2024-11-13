// src/application/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Application extends Document {

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  cvId: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
