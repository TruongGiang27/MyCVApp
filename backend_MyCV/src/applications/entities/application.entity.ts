// src/application/application.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Job } from 'src/jobs/entities/job.entity';
import { ManyToOne } from 'typeorm';

@Schema()
export class Application extends Document {

  @Prop({ required: true })
  userId: string;

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

  @ManyToOne(() => Job, (job) => job.applicants)
  job: Job;
}
export type ApplicantDocument = Application & Document;
export const ApplicationSchema = SchemaFactory.createForClass(Application);
