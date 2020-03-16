import {
	HttpException,
	HttpStatus,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../Shared/email.service';
import { TemplateInterface } from './../Templates/interfaces/template.interface';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { CampaignInterface } from './interfaces/campaign.interface';

@Injectable()
export class CampaignService {
	constructor(
		@Inject('winston') private readonly logger: Logger,
		@InjectModel('campaign')
		private readonly campaignModel: Model<CampaignInterface>,
		@InjectModel('template')
		private readonly templateModel: Model<TemplateInterface>,
		private readonly emailService: EmailService,
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
		this.startCampaign(campaign);
		return campaign;
	}

	async startCampaign(campaignData: CreateCampaignDto) {
		this.templateModel.findById(campaignData.templateId, (err, template) => {
			if (err) {
				this.logger.error(err);
				return err;
			}
			if (template === null) {
				this.logger.error(err);
				return new HttpException('Cannot find template', HttpStatus.NOT_FOUND);
			}

			// to - emails
			const to = [];
			let metaData = {};
			campaignData.audiences.map((audience) => {
				to.push({ email: audience.email });
			});
			// metaData["primaryText"] = findReplaceString(template.templateMetaData.primaryText, "name", );
			// metaData["secondaryText"] = template.templateMetaData.secondaryText;

			// send emails - start campaigns
			// this.emailService.sendCampaign(
			// 	campaignData._id,
			// 	to,
			// 	campaignData.sgTemplateId,

			// );

			// {
			// 	"personalizations": [{
			// 		"to": [{
			// 			"email": "recipient1@example.com"
			// 		}],
			// 		"cc": [{
			// 			"email": "recipient2@example.com"
			// 		}, {
			// 			"email": "recipient3@example.com"
			// 		}, {
			// 			"email": "recipient4@example.com"
			// 		}],
			// 		"substitutions": {
			// 			"%fname%": "recipient",
			// 			"%CustomerID%": "CUSTOMER ID GOES HERE"
			// 		},
			// 		"subject": "YOUR SUBJECT LINE GOES HERE"
			// 	}, {
			// 		"to": [{
			// 			"email": "recipient5@example.com"
			// 		}],
			// 		"cc": [{
			// 			"email": "recipient6@example.com"
			// 		}, {
			// 			"email": "recipient7@example.com"
			// 		}, {
			// 			"email": "recipient8@example.com"
			// 		}],
			// 		"substitutions": {
			// 			"%fname%": "recipient2",
			// 			"%CustomerID%": 55
			// 		},
			// 		"subject": "YOUR SUBJECT LINE GOES HERE"
			// 	}]
			// }
		});
	}
}
