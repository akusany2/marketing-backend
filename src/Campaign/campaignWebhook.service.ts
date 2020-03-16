import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from 'winston';
import { CampaignInterface } from './interfaces/campaign.interface';

@Injectable()
export class CampaignWebhookService {
	constructor(
		@InjectModel('campaign')
		private readonly campaignModel: Model<CampaignInterface>,
		@Inject('winston') private readonly logger: Logger,
	) {}
	async updateCampaign(sgWebhookData) {
		let parseWebhookDataToObj = {};

		sgWebhookData.map((data) => {
			if (parseWebhookDataToObj.hasOwnProperty(data.campaign_id)) {
				parseWebhookDataToObj[data.campaign_id].push(data);
			} else {
				parseWebhookDataToObj[data.campaign_id] = [data];
			}
		});

		await Object.keys(parseWebhookDataToObj).map(async (campaignId) => {
			try {
				await this.campaignModel.findOne(
					{ _id: campaignId },
					(err, campaign) => {
						if (err) {
							this.logger.error(err);
							return err;
						}

						if (campaign === null) {
							this.logger.error('CampaignId is worng');
							return new HttpException(
								'campaignId is wrong',
								HttpStatus.NOT_FOUND,
							);
						}

						this.logger.info(campaign);

						parseWebhookDataToObj[campaignId].map((webhookEvent) => {
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
					},
				);
			} catch (err) {
				this.logger.error(err);
			}
		});
	}
}
