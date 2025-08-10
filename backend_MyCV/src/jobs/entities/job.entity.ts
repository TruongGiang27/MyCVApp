import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Application } from 'src/applications/entities/application.entity';
import { OneToMany } from 'typeorm';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop({ required: true, index: true })
  userId: string;
  
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, index: true })
  companyName: string;

  @Prop({ required: true, index: true })
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
  @Prop({ type: String, enum: ['Mở', 'Tạm dừng', 'Đã Đóng'], default: 'Mở' })
  status: 'Mở' | 'Tạm dừng' | 'Đã Đóng';
  @OneToMany(() => Application, (application) => application.jobId)
  applicants: Application[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
JobSchema.index({ title: 'text', company: 'text', location: 'text' });
