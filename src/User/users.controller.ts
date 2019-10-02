import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(private userService: UserService) { }

  @Get()
  getAllUsers() {
    return 'Users controller';
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return await this.userService
      .createUser(user)
      .catch(err => new HttpException(err, HttpStatus.FORBIDDEN));
  }

  @Post('login')
  async login(@Body() user: CreateUserDto) {
    return await this.userService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Req() req) {
    return await this.userService.userProfile(req.user.username);
  }
}
