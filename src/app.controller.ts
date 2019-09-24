import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // Logger.log(process.env);
    Logger.log('process.env.DB_HOST');

    return this.appService.getHello();
  }
}
