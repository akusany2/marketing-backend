import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePassword, hashPassword } from '../Shared/utilities';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Company } from './interfaces/company.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    @InjectModel('users') private readonly userModel: Model<User>,
    @InjectModel('company') private readonly companyModel: Model<Company>,
    private jwtService: JwtService,
  ) { }
  async findAllUsers() {
    return await this.userModel.find().exec();
  }
  async createCompany(companyData: CreateCompanyDto) {
    const company = this.companyModel(companyData);
    await company.save();
    return company;
  }
  async createUser(userData: CreateUserDto) {
    userData.password = await hashPassword(userData.password);

    const user = this.userModel(userData);
    const company = await this.companyModel.findOne({ companyId: userData.companyId },
      (err, data) => {
        if (err) { return err; }
        return data;
      });

    // await user.save();
    company.users.push(user);
    await company.save();
    return await this.createToken(user.username, user.id);
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
      delete userObj['password'];
      return {
        userObj,
        token: await this.createToken(user.username, user.id),
      };
    }
    return new HttpException('invalidCredentials', HttpStatus.NOT_FOUND);
  }

  async createToken(username, userId) {
    return await this.jwtService.sign({
      username,
      userId,
    });
  }
}
