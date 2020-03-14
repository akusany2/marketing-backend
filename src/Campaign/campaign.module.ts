import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from '../Shared/email.service';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignWebhookController } from './campaignWebhook.controller';
import { CampaignSchema } from './schema/campaign.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'campaign', schema: CampaignSchema }]),
	],
	controllers: [CampaignController, CampaignWebhookController],
	providers: [CampaignService, EmailService],
})
export class CampaignModule {}
