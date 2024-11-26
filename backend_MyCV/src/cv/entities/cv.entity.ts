import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Address {
  @Prop({ type: String, required: true }) country: string;
  @Prop({ type: String, required: true }) address: string;
  @Prop({ type: String, required: true }) city: string;
  @Prop({ type: String, required: true }) zipCode: string;
}
const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
class Education {
  @Prop({ type: String, required: true }) educationLevel: string;
  @Prop({ type: String, required: true }) fieldOfStudy: string;
  @Prop({ type: String, required: true }) schoolName: string;
  @Prop({ type: String, required: true }) educationCountry: string;
  @Prop({ type: String, required: true }) educationCity: string;
  @Prop({ type: Date, required: true }) educationStartDate: Date;
  @Prop({ type: Date, required: true }) educationEndDate: Date;
  @Prop({ type: String }) educationDescription?: string;
  @Prop({ type: String }) highestEducationLevel?: string;
}
const EducationSchema = SchemaFactory.createForClass(Education);

@Schema()
class Experience {
  @Prop({ type: String, required: true }) jobTitle: string;
  @Prop({ type: String, required: true }) companyName: string;
  @Prop({ type: String, required: true }) workCountry: string;
  @Prop({ type: String, required: true }) workCity: string;
  @Prop({ type: Date, required: true }) workStartDate: Date;
  @Prop({ type: Date, required: true }) workEndDate: Date;
  @Prop({ type: String }) workExperience?: string;
  @Prop({ type: String }) highestJobLevel?: string;
}
const ExperienceSchema = SchemaFactory.createForClass(Experience);

@Schema()
class JobPreferences {
  @Prop({ type: String, required: true }) desiredJobTitle: string;
  @Prop({ type: String, required: true }) jobType: string;
  @Prop({ type: Number, required: true }) minimumSalary: number;
}
const JobPreferencesSchema = SchemaFactory.createForClass(JobPreferences);

@Schema({ collection: 'cv_form' })
export class Cv extends Document {
<<<<<<< HEAD
  @Prop() fullName?: string;
  @Prop() email: string;
  @Prop({ required: true }) phone: string;
=======
  @Prop({ type: String, required: true }) googleId: string;
  @Prop({ type: String }) fullName?: string;
  @Prop({ type: String, required: true }) email: string;
  @Prop({ type: String, required: true }) phone: string;
>>>>>>> f81756519326148383bd6fa738f8966ddbbc03ba
  @Prop({ type: AddressSchema, required: true }) address: Address;
  @Prop({ type: EducationSchema, required: true }) education: Education;
  @Prop({ type: ExperienceSchema, required: true }) experience: Experience;
  @Prop({ type: [String], required: true }) skills: string[];
  @Prop({ type: String, required: true }) certifications: string;
  @Prop({ type: String }) birthDate?: string;
  @Prop({ type: String }) summary?: string;
  @Prop({ type: JobPreferencesSchema, required: true }) jobPreferences: JobPreferences;
}
export const CvSchema = SchemaFactory.createForClass(Cv);
