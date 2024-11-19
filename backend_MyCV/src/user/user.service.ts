import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }
  async create(createUserDto: CreateUserDto) {
    console.log("Create User DTO:", createUserDto); // Log dữ liệu DTO để kiểm tra

    const updatedUser = await this.userModel.findOneAndUpdate(
      { googleId: createUserDto.googleId },
      createUserDto,
      { new: true, upsert: true }
    );
    console.log("Updated User:", updatedUser);
    return updatedUser;
  }


  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
