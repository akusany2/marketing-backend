import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignWebhookController } from './campaignWebhook.controller';
import { CampaignWebhookService } from './campaignWebhook.service';
import { CampaignSchema } from './schema/campaign.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'campaign', schema: CampaignSchema }]),
	],
	controllers: [CampaignController, CampaignWebhookController],
	providers: [CampaignService, CampaignWebhookService],
})
export class CampaignModule {}
