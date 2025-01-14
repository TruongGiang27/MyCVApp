import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types  } from 'mongoose';
import { Job, JobDocument } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { SearchJobDto } from './dto/search-title-company.dto';
import { query } from 'express';
import { ApplicantDocument, Application } from 'src/applications/entities/application.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(Application.name) private applicantsRepository: Model<ApplicantDocument>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    console.log("create Job------------",createJobDto);
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().exec();
  }

  async suggestJobsOrCompanies(query: string): Promise<Job[]> {
    if (!query || typeof query !== 'string' || !query.trim()) {
      return [];
    }

    const regex = new RegExp('^'+query, 'i');
    return this.jobModel
      .find({
        $or: [
          { title: { $regex: regex } },
          { company: { $regex: regex } },
        ]
      })
      .limit(10)
      .exec();
  }

  async search(query?: string, location?: string): Promise<Job[]> {
    const filters: any = {};

    if (query) {
      filters.$or = [
        { title: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
      ];
    }

    if (location) {
      filters.location = { $regex: location, $options: 'i' };
    }

    console.log('Filters:', );
    return this.jobModel
      .find(filters)
      .sort({ createdAt: -1 })
      .limit(50)
      .exec();
  }

  async findOne(id: string): Promise<Job> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format'); // Hoặc bạn có thể trả về một lỗi phù hợp
    }
    return this.jobModel.findById(id).exec();
  }

  async delete(id: string): Promise<Job> {
    return this.jobModel.findByIdAndDelete(id).exec();
  }
  async update(id: string, updateJobDto: Partial<CreateJobDto>): Promise<Job> {
    // Tìm công việc theo ID
    const job = await this.findOne(id);
    if (!job) {
      throw new Error('Công việc không tồn tại');
    }
  
    // Kiểm tra trạng thái "Đã đóng" và ứng viên
    if (updateJobDto.status === 'Đã Đóng') {
      const hasApplicants = await this.checkApplicantsForJob(id);
      if (hasApplicants) {
        throw new Error('Không thể đóng công việc. Công việc hiện có ứng viên nộp CV.');
      }
    }
  
    // Cập nhật công việc
    return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true }).exec();
  }
  

  async getJobByUserId(userId: string): Promise<Job[]> {
    return this.jobModel.find({ userId: userId }).exec();
  }

  async checkApplicantsForJob(jobId: string): Promise<boolean> {
    // Kiểm tra jobId có hợp lệ hay không
    if (!Types.ObjectId.isValid(jobId)) {
      throw new Error('Invalid Job ID');
    }
  
    // Giả sử bạn đã có model `Applicant` được inject tương tự như `Job`
    const applicants = await this.applicantsRepository.find({ jobId }).exec();
  
    // Kiểm tra nếu có ứng viên nộp CV
    return applicants.length > 0;
  }
  
  
}
