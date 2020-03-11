import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AudienceService } from '../Audience/audience.service';
import { EmailService } from '../Shared/email.service';
import { CampaignController } from './campaign.controller';
import { CampaignWebhookController } from './campaignWebhook.controller';
import { CampaignSchema } from './schema/campaign.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'campaign', schema: CampaignSchema }]),
	],
	controllers: [CampaignController, CampaignWebhookController],
	providers: [AudienceService, EmailService],
})
export class CampaignModule {}
