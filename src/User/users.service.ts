import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from '../Shared/utilities';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async findAllUsers() {
    return await this.userModel.find().exec();
  }
  async createUser(userData: CreateUserDto) {
    userData.password = await hashPassword(userData.password);

    const user = this.userModel(userData);
    await user.save();
    return await this.jwtService.sign({ username: user.username });
  }
  async userProfile(username) {
    return await this.userModel.findOne({ username }, (err, data) => {
      if (err) {
        return err;
      }

      return data;
    });
  }
  async login(userData: CreateUserDto) {
    // const user = this.jwtService.verify()
    return true;
  }
}
