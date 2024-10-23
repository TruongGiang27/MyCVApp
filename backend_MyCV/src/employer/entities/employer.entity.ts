import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Employer extends Document {
  @Prop({ required: true })
  selectedCompany: string;

  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  numberOfEmployees: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  howDidYouHear: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  describe: string;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);