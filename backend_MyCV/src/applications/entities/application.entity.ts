// src/application/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Application extends Document {

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  cvId: string;
  
  @Prop({ required: true })
  CVfullNameUser: string;

  @Prop({ required: true })
  CVEmailUser: string;

  @Prop({ required: true })
  status: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
