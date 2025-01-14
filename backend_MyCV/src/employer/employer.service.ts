import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { Employer } from './entities/employer.entity';

const API_URL = 'http://localhost:3000/employers';

export const createEmployer = async (employerData) => {
  try {
    const response = await axios.post(API_URL, employerData);
    return response.data;
  } catch (error) {
    console.error('Error creating employer:', error);
    throw error;
  }
};
@Injectable()
export class EmployerService {
  constructor(@InjectModel(Employer.name) private employerModel: Model<Employer>) {}

  async create(createEmployerDto: CreateEmployerDto): Promise<Employer> {
    const createdEmployer = new this.employerModel(createEmployerDto);
    return createdEmployer.save();
  }

  async findAll(): Promise<Employer[]> {
    return this.employerModel.find().exec();
  }

  async findOne(userId: string): Promise<Employer> {
    const employer = await this.employerModel.findOne({ userId: userId }).exec();
    if (!employer) {
      throw new NotFoundException(`Employer with ID ${userId} not found`);
    }
    return employer;
  }

  async update(id: string, updateEmployerDto: UpdateEmployerDto): Promise<Employer> {
    const updatedEmployer = await this.employerModel.findByIdAndUpdate(id, updateEmployerDto, { new: true }).exec();
    if (!updatedEmployer) {
      throw new NotFoundException(`Employer with ID ${id} not found`);
    }
    console.log('updatedEmployer:', updatedEmployer);
    return updatedEmployer;
  }

  async remove(id: string): Promise<Employer> {
    const deletedEmployer = await this.employerModel.findByIdAndDelete(id).exec();
    if (!deletedEmployer) {
      throw new NotFoundException(`Employer with ID ${id} not found`);
    }
    return deletedEmployer;
  }
  
  async hasCvEmployer(userId: string): Promise<boolean> {
    const employer = await this.employerModel.findOne({ userId });
    console.log("userid-----", userId);
    console.log('employer:', employer);
    return !!employer?.userId;
  }
  async findByFilters(filters: any): Promise<Employer[]> {
    return this.employerModel.find(filters).exec();
  }

  async updateAdmin(
    id: string,
    updateEmployerDto: Partial<Employer>,
  ): Promise<Employer> {
    const updatedEmployer = await this.employerModel
      .findByIdAndUpdate(id, updateEmployerDto, { new: true })
      .exec();

    if (!updatedEmployer) {
      throw new NotFoundException(`Employer with ID ${id} not found`);
    }
    return updatedEmployer;
  }
}