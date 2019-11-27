import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePassword, hashPassword } from '../Shared/utilities';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) { }
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
    const user = await this.userModel.findOne(
      { username: userData.username },
      (err, data) => {
        if (err) {
          return err;
        }

        return data;
      },
    );
    if (!user) {
      return new HttpException('invalidCredentials', HttpStatus.NOT_FOUND);
    }

    if (await comparePassword(userData.password, user.password)) {
      const userObj = user.toObject();
      delete userObj.password;
      return {
        user: userObj,
        token: await this.jwtService.sign({ username: user.username }),
      };
    }
    return new HttpException('invalidCredentials', HttpStatus.NOT_FOUND);
  }
}
