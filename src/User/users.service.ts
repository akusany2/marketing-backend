import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePassword } from '../../dist/Shared/utilities';
import { hashPassword } from '../Shared/utilities';
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
    const companyObj = company.toObject();
    const userExists = companyObj.users.filter(userObj => userObj.username === userData.username);
    if (userExists.length) {
      return new HttpException('Duplicate user', HttpStatus.FORBIDDEN);
    }
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
    const company = await this.companyModel.findOne({ companyId: userData.companyId }).lean().exec()
      .then((err, foundCompany) => {
        if (err) {
          return err;
        }
      }).catch(err => new HttpException('Could not execute', HttpStatus.NOT_FOUND));

    const foundUserArray = company.users.filter(userObj => userObj.username === userData.username);
    const foundUser = foundUserArray && foundUserArray[0];
    if (!foundUser) {
      return new HttpException('invalidCredentials', HttpStatus.NOT_FOUND);
    }

    if (await comparePassword(userData.password, foundUser.password)) {
      // const userObj = foundUser.toObject();
      delete foundUser['password'];
      return {
        user: foundUser,
        token: await this.createToken(foundUser.username, foundUser._id.toString()),
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
