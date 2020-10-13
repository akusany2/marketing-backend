import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../Shared/email.service';
import { SurveyInterface } from './interfaces/survey.interface';

@Injectable()
export class SurveyService {
	constructor(
		@InjectModel('survey') private surveyModel: Model<SurveyInterface>,
		private emailService: EmailService,
		@Inject('winston') private logger: Logger,
	) {}

	async getAllSurvey(companyId) {
		return await this.surveyModel.find(
			{ companyId },
			null,
			{ sort: { createdAt: -1 } },
			(err, survey) => {
				if (err) {
					this.logger.error(err);
					return err;
				}

				return survey;
			},
		);
	}

	async createSurvey(surveyData: SurveyInterface) {
		delete surveyData['_id'];
		const survey = this.surveyModel(surveyData);
		await survey.save();
		await this.startSurvey(survey);
		return survey;
	}

	async createSurveyOnly(surveyData: SurveyInterface) {
		const survey = this.surveyModel(surveyData);
		await survey.save();
		return survey;
	}
	async deleteSurveys() {
		return await this.surveyModel.deleteMany({});
	}
	async startSurvey(survey) {
		let personalization = [];

		survey.audiences.map((audience) => {
			personalization.push({
				to: [{ email: audience.email }],
				subject: survey.name,
				dynamic_template_data: {
					surveyMessage:
						survey.message +
						" <br/><br/><br/> <a href='localhost:4200/ target='_blank'>Click here to take the survey!</a>",
				},
			});
		});
		this.emailService.sendCampaign(
			'survey@lioncrm.com',
			personalization,
			{ survey_id: survey._id.toString() },
			'd-841bfd5d00d644189739194f74c3e05b',
		);
	}
}
