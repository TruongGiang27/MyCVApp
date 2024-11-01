import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  salary: string;

  @Prop()
  jobType: string;

  @Prop()
  jobDescription: string;

  @Prop()
  requirements: string;

  @Prop()
  benefits: string;

  @Prop({ type: Object })
  additionalInfo: {
    deadline: string;
    experience: string;
    education: string;
    quantity: number;
    gender: string;
  };
  
}

export const JobSchema = SchemaFactory.createForClass(Job);
