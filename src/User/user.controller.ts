import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return 'Users controller';
  }
}
