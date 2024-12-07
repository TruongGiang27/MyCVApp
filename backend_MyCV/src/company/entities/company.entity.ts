import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CompanyDocument = Company & Document;
@Schema({collection: 'company'})
export class Company extends Document {
    @Prop({ required: true })
    userId: string;
  
    @Prop({ required: true })
    jobId: string;

    @Prop({ required: true })
    companyName: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);