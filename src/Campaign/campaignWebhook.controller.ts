import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Logger } from 'winston';
import { CampaignWebhookService } from './campaignWebhook.service';

@Controller('campaign-webhook')
export class CampaignWebhookController {
	constructor(
		@Inject('winston') private readonly logger: Logger,
		private campaignWebhookService: CampaignWebhookService,
	) {}

	@Post()
	async sendGridHook(@Body() webhookData) {
		this.logger.info(webhookData);
		return await this.campaignWebhookService.updateCampaign(webhookData);
	}

	@Get()
	async sendGridHookTest() {
		return await "it's ON!";
	}
}
