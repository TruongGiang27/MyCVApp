import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employer extends Document {
  @Prop()
  companyName: string;

  @Prop()
  companySize: string;

  @Prop()
  fullName: string;

  @Prop()
  isManager: string;

  @Prop()
  howDidYouHear: string;

  @Prop()
  phoneNumber: string;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);