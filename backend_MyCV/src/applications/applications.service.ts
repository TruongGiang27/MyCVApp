// src/application/application.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationService {
  constructor(@InjectModel(Application.name) private applicationModel: Model<Application>) { }

  async createApplication(applicationData: Partial<Application>): Promise<Application> {
    const newApplication = new this.applicationModel(applicationData);
    return await newApplication.save();
  }

  async getAllApplications(): Promise<Application[]> {
    return await this.applicationModel.find().exec();
  }

  async getApplicationById(id: string): Promise<Application> {
    const application = await this.applicationModel.findById(id).exec();
    if (!application) throw new NotFoundException(`Application with ID ${id} not found`);
    return application;
  }

  async getApplicationsByJobId(jobId: string): Promise<Application[]> {
    const applications = await this.applicationModel.find({jobId: jobId}).exec();
    // console.log(applications)
    // if (applications.length === 0) {
    //   throw new NotFoundException(`No applications found for jobId ${jobId}`);
    // }

    return applications;
  }
  async updateApplication(id: string, applicationData: Partial<Application>): Promise<Application> {
    const updatedApplication = await this.applicationModel.findByIdAndUpdate(id, applicationData, { new: true }).exec();
    if (!updatedApplication) throw new NotFoundException(`Application with ID ${id} not found`);
    return updatedApplication;
  }

  async deleteApplication(id: string): Promise<{ deleted: boolean }> {
    const result = await this.applicationModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) throw new NotFoundException(`Application with ID ${id} not found`);
    return { deleted: true };
  }

  async declineCv(cvId: string, jobId: string, status: string): Promise<Application> {
    // Tìm và cập nhật trạng thái CV
    return this.applicationModel.findOneAndUpdate(
      { cvId: cvId, jobId: jobId },
      { status: 'declined' },
      { new: true } // Trả về bản ghi đã cập nhật
    ).exec();
  }

  async getApplicationsByUserId(userId: string): Promise<Application[]> {
    const applications = await this.applicationModel.find({userId: userId}).exec();
    return applications;
  }
}
