import {
	Body,
	Controller,
	HttpException,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SurveyService } from './survey.service';

@UseGuards(AuthGuard('jwt'))
@Controller('survey')
export class SurveyController {
	constructor(private surveyService: SurveyService) {}

	@Post('all')
	getSurvey(@Body() body) {
		return this.surveyService
			.getAllSurvey(body.companyId)
			.catch((e) => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
	}

	@Post('create')
	createSurvey(@Body() body) {
		return this.surveyService
			.createSurvey(body.data)
			.catch((e) => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
	}
}
