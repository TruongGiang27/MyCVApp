import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(@InjectModel(Cv.name) private cvModel: Model<Cv>) {}

  async createCv(data: any): Promise<Cv> {
    const newCv = new this.cvModel(data);
    return newCv.save();
  }

  async updateCv(id: string, data: any): Promise<Cv> {
    return this.cvModel.findByIdAndUpdate(id, data, { new: true });
  }

  async getCv(id: string): Promise<Cv> {
    return this.cvModel.findById(id);
  }
}
