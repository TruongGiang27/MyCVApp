import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema() // Không cần đặt tên collection ở đây, vì chỉ định trong Cv
class Address {
  @Prop({ required: true }) country: string;
  @Prop({ required: true }) street: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) zip: string;
}
const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
class Education {
  @Prop({ required: true }) degree: string;
  @Prop({ required: true }) field: string;
  @Prop({ required: true }) school: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) state: string;
  @Prop({ required: true }) country: string;
  @Prop() details: string;
}
const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
class Experience {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) company: string;
  @Prop({ required: true }) country: string;
  @Prop({ required: true }) city: string;
  @Prop() state?: string;
  @Prop() description?: string;
}
const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
class JobPreferences {
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) jobType: string;
  @Prop({ required: true }) minSalary: number;
  @Prop({ required: true }) relocation: boolean;
}
const JobPreferencesSchema = SchemaFactory.createForClass(JobPreferences);

@Schema({ collection: 'cv_form' }) // Đặt tên collection là "cv_form"
export class Cv extends Document {
  @Prop({ required: true }) fullName: string;
  @Prop() phoneNumber: string;
  
  @Prop({ type: AddressSchema, required: true }) address: Address;
  
  @Prop({ type: [EducationSchema], required: true }) education: Types.Array<Education>;
  
  @Prop({ type: [ExperienceSchema], required: true }) experience: Types.Array<Experience>;
  
  @Prop({ type: [String], required: true }) skills: string[];
  
  @Prop({ type: [String], required: true }) certifications: string[];
  
  @Prop({ type: JobPreferencesSchema, required: true }) jobPreferences: JobPreferences;
  
  @Prop({ required: true, default: false }) visibleToRecruiters: boolean;
}

export const CvSchema = SchemaFactory.createForClass(Cv);
