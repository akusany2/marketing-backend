import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('surveyWebhook')
export class SurveyWebhookController {
	constructor() {}
	@Get()
	surveyWebhookStatus() {
		return 'Survey webhook working!';
	}
	@Post()
	recieveTwilioResponse(@Body() body) {
		console.log(body);
	}
}
