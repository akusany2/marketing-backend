import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignSchema } from '../Campaign/schema/campaign.schema';
import { SurveySchema } from '../Survey/schema/survey.schema';
import { SGWebhookController } from './sgWebhook.controller';
import { SGWebhookService } from './sgWebhook.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'campaign', schema: CampaignSchema },
			{ name: 'survey', schema: SurveySchema },
		]),
	],
	controllers: [SGWebhookController],
	providers: [SGWebhookService],
})
export class SGWebhookModule {}
