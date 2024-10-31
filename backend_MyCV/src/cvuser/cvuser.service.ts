import { Injectable } from '@nestjs/common';
import { CreateCvuserDto } from './dto/create-cvuser.dto';
import { UpdateCvuserDto } from './dto/update-cvuser.dto';

@Injectable()
export class CvuserService {
  create(createCvuserDto: CreateCvuserDto) {
    return 'This action adds a new cvuser';
  }

  findAll() {
    return `This action returns all cvuser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cvuser`;
  }

  update(id: number, updateCvuserDto: UpdateCvuserDto) {
    return `This action updates a #${id} cvuser`;
  }

  remove(id: number) {
    return `This action removes a #${id} cvuser`;
  }
}
