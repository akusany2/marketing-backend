import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}
	private logger = new Logger(AppController.name);
	@Get()
	getHello(): string {
		// Logger.log(process.env);

		this.logger.log(process.env.JWT_SECRET);

		return this.appService.getHello();
	}
}
