import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Document } from 'mongoose';

@Schema()
export class Employer extends Document {
  @Prop({ required: true })
  id: ObjectId;
  
  @Prop({ required: true })
  userId: string;

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

  @Prop({ default: false })
  isBlocked: boolean;
  
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);

EmployerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});