import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return 'Users controller';
  }
}
