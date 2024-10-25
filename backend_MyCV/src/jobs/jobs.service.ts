import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async findOne(id: string): Promise<Job> {
    return this.jobModel.findById(id).exec();
  }

  async delete(id: string): Promise<Job> {
    return this.jobModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, createJobDto: CreateJobDto): Promise<Job> {
    return this.jobModel.findByIdAndUpdate(id, createJobDto, { new: true }).exec();
  }
}
