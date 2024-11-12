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

  // Thêm trường status với enum để lưu trạng thái đơn tuyển dụng
  @Prop({ type: String, enum: ['Mở', 'Tạm dừng', 'Đóng'], default: 'Mở' })
  status: 'Mở' | 'Tạm dừng' | 'Đóng';
}

export const JobSchema = SchemaFactory.createForClass(Job);
