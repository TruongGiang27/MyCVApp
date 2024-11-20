import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Address {
  @Prop({ required: true }) country: string;
  @Prop({ required: true }) address: string;
  @Prop({ required: true }) city: string;
  @Prop({ required: true }) zipCode: string;
}
const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
class Education {
  @Prop({ required: true }) educationLevel: string;
  @Prop({ required: true }) fieldOfStudy: string;
  @Prop({ required: true }) schoolName: string;
  @Prop({ required: true }) educationCountry: string;
  @Prop({ required: true }) educationCity: string;
  @Prop({ required: true }) educationStartDate: Date;
  @Prop({ required: true }) educationEndDate: Date;
  @Prop() educationDescription?: string;
  @Prop() highestEducationLevel?: string;
}

const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
class Experience {
  @Prop({ required: true }) jobTitle: string;
  @Prop({ required: true }) companyName: string;
  @Prop({ required: true }) workCountry: string;
  @Prop({ required: true }) workCity: string;
  @Prop({ required: true }) workStartDate: Date;
  @Prop({ required: true }) workEndDate: Date;
  @Prop() workExperience?: string;
  @Prop() highestJobLevel?: string;
}
const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
class JobPreferences {
  @Prop({ required: true }) desiredJobTitle: string;
  @Prop({ required: true }) jobType: string;
  @Prop({ required: true }) minimumSalary: number;
}

const JobPreferencesSchema = SchemaFactory.createForClass(JobPreferences);

@Schema({ collection: 'cv_form' })
export class Cv extends Document {
  @Prop() fullName?: string;
  @Prop() email: string;
  @Prop({ required: true }) phone: string;
  @Prop({ type: AddressSchema, required: true }) address: Address;
  @Prop({ type: EducationSchema, required: true }) education: Education;
  @Prop({ type: ExperienceSchema, required: true }) experience: Experience;
  @Prop({ type: [String], required: true }) skills: string[];
  @Prop({ required: true }) certifications: string;
  @Prop() birthDate: string;
  @Prop() summary?: string;
  @Prop({ type: JobPreferencesSchema, required: true }) jobPreferences: JobPreferences;
}

export const CvSchema = SchemaFactory.createForClass(Cv);
