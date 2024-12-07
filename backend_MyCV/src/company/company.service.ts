import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const existingCompany = await this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true }).exec();
    if (!existingCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return existingCompany;
  }

  async remove(id: string): Promise<Company> {
    const deletedCompany = await this.companyModel.findByIdAndDelete(id).exec();
    if (!deletedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return deletedCompany;
  }
  async findJobByUserIdAndJobId(userId: string, jobId: string): Promise<Company> { // Tìm công việc theo userId và jobId
    const job = await this.companyModel
      .findOne({ userId, jobId: { $in: [jobId] } }) // Kiểm tra nếu jobId nằm trong mảng
      .exec();
  
    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} for user ${userId} not found`);
    }
  
    return job;
  }

  async getCompaniesByUser(userId: string) { // Lấy ra danh sách công ty theo userId
    try {
      // Tìm các công ty thuộc về userId
      const companies = await this.companyModel.find({ userId }).populate('jobId').exec();

      // Map lại dữ liệu cần thiết
      return companies.map((company) => ({
        companyName: company.companyName,
        jobs: company.jobId, // Job đã được populate
      }));
    } catch (error) {
      throw new Error(`Failed to fetch companies: ${error.message}`);
    }
  }
  
}