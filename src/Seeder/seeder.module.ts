import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AudienceSchema } from '../Audience/schemas/audience.schema';
import { CampaignSchema } from '../Campaign/schema/campaign.schema';
import { EmailService } from '../Shared/email.service';
import { LanguageService } from '../Shared/language.service';
import { SurveySchema } from '../Survey/schema/survey.schema';
import { SurveyService } from '../Survey/survey.service';
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
			{ name: 'survey', schema: SurveySchema },
		]),
	],
	controllers: [SeederController],

	providers: [
		SeederService,
		AudienceService,
		EmailService,
		CampaignService,
		SurveyService,
		LanguageService,
	],
})
export class SeederModule {}
