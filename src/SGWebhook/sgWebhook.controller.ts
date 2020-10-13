import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Logger } from 'winston';
import { SGWebhookService } from './sgWebhook.service';

@Controller('sg-webhook')
export class SGWebhookController {
	constructor(
		@Inject('winston') private readonly logger: Logger,
		private sgWebhookService: SGWebhookService,
	) {}

	@Post()
	async sendGridHook(@Body() webhookData) {
		this.logger.info(webhookData);
		return await this.sgWebhookService.update(webhookData);
	}

	@Get()
	async sendGridHookTest() {
		return await "it's ON!";
	}
}
