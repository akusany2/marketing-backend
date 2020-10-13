import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from '../Shared/email.service';
import { TemplateSchema } from '../Templates/schemas/template.schema';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { CampaignSchema } from './schema/campaign.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'campaign', schema: CampaignSchema },
			{ name: 'template', schema: TemplateSchema },
		]),
	],
	controllers: [CampaignController],
	providers: [CampaignService, EmailService],
})
export class CampaignModule {}
