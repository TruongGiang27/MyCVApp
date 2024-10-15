import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: true })
export class User extends Document {
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

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);