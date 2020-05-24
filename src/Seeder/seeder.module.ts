import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AudienceSchema } from '../Audience/schemas/audience.schema';
import { CampaignSchema } from '../Campaign/schema/campaign.schema';
import { EmailService } from '../Shared/email.service';
import { LanguageService } from '../Shared/language.service';
import { TemplateSchema } from '../Templates/schemas/template.schema';
import { AudienceService } from './../Audience/audience.service';
import { CampaignService } from './../Campaign/campaign.service';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'audience', schema: AudienceSchema },
			{ name: 'campaign', schema: CampaignSchema },
			{ name: 'template', schema: TemplateSchema },
		]),
	],
	controllers: [SeederController],
	providers: [
		SeederService,
		AudienceService,
		EmailService,
		CampaignService,
		LanguageService,
	],
})
export class SeederModule {}
