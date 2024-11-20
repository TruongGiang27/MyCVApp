// src/application/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Application extends Document {

  @Prop({ required: true })
  googleId: string;

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  jobName: string;

  @Prop({ required: true })
  cvId: string;
  
  @Prop({ required: true })
  CVfullNameUser: string;

  @Prop({})
  CVEmailUser: string;

  @Prop({ required: true })
  status: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
