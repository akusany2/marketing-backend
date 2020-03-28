import { Controller, Inject, Post, Query } from '@nestjs/common';
import { Logger } from 'winston';

@Controller('external')
export class ExternalController {
	constructor(@Inject('winston') private logger: Logger) {}
	@Post('unsubscribe')
	unsubscribeAudience(@Query('audience') audienceId) {
		this.logger.info(audienceId);
		return 'Successfully removed from email list';
	}
}
