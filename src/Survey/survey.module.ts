import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioService } from '../Shared/twilio.service';
import { SurveySchema } from './schema/survey.schema';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { SurveyWebhookController } from './surveyWebhook.controller';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'survey', schema: SurveySchema }]),
	],
	controllers: [SurveyController, SurveyWebhookController],
	providers: [SurveyService, TwilioService],
})
export class SurveyModule {}
