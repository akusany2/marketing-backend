import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UserSchema } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserSchema) private readonly userModel: Model<User>,
  ) {}
  async findAllUsers() {
    return await this.userModel.find().exec();
  }
}
