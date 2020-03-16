import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from '../Shared/email.service';
import { TemplateSchema } from '../Templates/schemas/template.schema';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignWebhookController } from './campaignWebhook.controller';
import { CampaignWebhookService } from './campaignWebhook.service';
import { CampaignSchema } from './schema/campaign.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'campaign', schema: CampaignSchema },
			{ name: 'template', schema: TemplateSchema },
		]),
	],
	controllers: [CampaignController, CampaignWebhookController],
	providers: [CampaignService, CampaignWebhookService, EmailService],
})
export class CampaignModule {}
