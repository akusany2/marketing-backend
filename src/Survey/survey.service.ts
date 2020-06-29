import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SurveyInterface } from './interfaces/survey.interface';

@Injectable()
export class SurveyService {
	constructor(
		@InjectModel('survey') private surveyModel: Model<SurveyInterface>,
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
		const survey = this.surveyModel(surveyData);
		await survey.save();
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
	async startSurvey() {
		return 'survey started';
	}
}
