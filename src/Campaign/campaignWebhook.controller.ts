import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AudienceService } from '../Audience/audience.service';
import { EmailService } from '../Shared/email.service';

@Controller('campaign-webhook')
export class CampaignWebhookController {
	private logger = new Logger(CampaignWebhookController.name);
	constructor(
		private audienceService: AudienceService,
		private emailService: EmailService,
	) {}

	@Post()
	sendGridHook(@Body() webhookData) {
		this.logger.log(webhookData);
	}
}
