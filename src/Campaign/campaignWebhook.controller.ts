import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Logger } from 'winston';
import { EmailService } from '../Shared/email.service';

@Controller('campaign-webhook')
export class CampaignWebhookController {
	constructor(
		@Inject('winston') private readonly logger: Logger,
		private emailService: EmailService,
	) {}

	@Post()
	sendGridHook(@Body() webhookData) {
		this.logger.info(webhookData);
	}

	@Get()
	sendGridHookTest() {
		return 'Webhook path working!';
	}
}
