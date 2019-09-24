import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers() {
    return 'Users controller';
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    // this.logger.log(user);
    // return user;
    return this.userService
      .createUser(user)
      .catch(err => new HttpException('Forbidden', HttpStatus.FORBIDDEN));
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    // this.logger.log(req);
    return req;
  }
}
