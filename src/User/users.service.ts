import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(@InjectModel('users') private readonly userModel: Model<User>) {}
  async findAllUsers() {
    return await this.userModel.find().exec();
  }
  async createUser(userData: CreateUserDto) {
    const user = this.userModel(userData);
    return await user.save();
  }
}
