import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../Shared/email.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CampaignInterface } from './interfaces/campaign.interface';

@Injectable()
export class CampaignService {
	constructor(
		@Inject('winston') private readonly logger: Logger,
		@InjectModel('campaign')
		private readonly campaignModel: Model<CampaignInterface>,
		private emailService: EmailService,
	) {}

	async getAllCampaign(companyId) {
		return await this.campaignModel.find(
			{ companyId },
			null,
			{ sort: { createdAt: -1 } },
			(err, campaign) => {
				if (err) {
					this.logger.error(err);
					return err;
				}

				return campaign;
			},
		);
	}

	async createCampaign(campaignData: CreateCampaignDto) {
		const campaign = this.campaignModel(campaignData);
		await campaign.save();
		return campaign;
	}
}
