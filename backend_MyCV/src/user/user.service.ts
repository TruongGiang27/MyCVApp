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
    const existingUser = await this.userModel.findOne({ userId: createUserDto.userId });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    console.log("Created new user:", newUser);
    return newUser;
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
