import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from '../Shared/email.service';
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
	providers: [SurveyService, TwilioService, EmailService],
})
export class SurveyModule {}
