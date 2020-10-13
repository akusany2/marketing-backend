import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from 'winston';
import { CampaignInterface } from '../Campaign/interfaces/campaign.interface';
import { SurveyInterface } from './../Survey/interfaces/survey.interface';

@Injectable()
export class SGWebhookService {
	constructor(
		@InjectModel('campaign')
		private readonly campaignModel: Model<CampaignInterface>,
		@InjectModel('survey')
		private readonly surveyModel: Model<SurveyInterface>,
		@Inject('winston') private readonly logger: Logger,
	) {}
	async update(sgWebhookData) {
		let campaignDataToObj = {};
		let surveyDataToObj = {};

		sgWebhookData.map((data) => {
			if (campaignDataToObj.hasOwnProperty(data.campaign_id)) {
				campaignDataToObj[data.campaign_id].push(data);
			} else {
				campaignDataToObj[data.campaign_id] = [data];
			}

			if (surveyDataToObj.hasOwnProperty(data.campaign_id)) {
				surveyDataToObj[data.survey_id].push(data);
			} else {
				surveyDataToObj[data.survey_id] = [data];
			}
		});
		Object.keys(campaignDataToObj).length &&
			(await this.updateModel('campaignModel', campaignDataToObj));
		Object.keys(surveyDataToObj).length &&
			(await this.updateModel('surveyModel', surveyDataToObj));
	}

	async updateModel(model, parseWebhookDataToObj) {
		await Object.keys(parseWebhookDataToObj).map(async (id) => {
			try {
				await this[model].findOne({ _id: id }, (err, campaign) => {
					if (err) {
						this.logger.error(err);
						return err;
					}

					if (campaign === null) {
						this.logger.error('CampaignId is wrong');
						return new HttpException(
							'campaignId is wrong',
							HttpStatus.NOT_FOUND,
						);
					}

					this.logger.info(campaign);

					parseWebhookDataToObj[id].map((webhookEvent) => {
						for (let i = 0; i < campaign.audiences.length; i++) {
							if (campaign.audiences[i].email === webhookEvent.email) {
								// look for better way to add empty object in subdoc
								if (campaign.audiences[i].event == undefined)
									campaign.audiences[i].event = {};

								campaign.audiences[i].event[webhookEvent.event] = true;
								campaign.audiences[i].time = webhookEvent.timestamp;
								return;
							}
						}
					});
					campaign.markModified('audiences');
					campaign.save();
				});
				return await 'Updated';
			} catch (err) {
				this.logger.error(err);
			}
		});
	}
}
