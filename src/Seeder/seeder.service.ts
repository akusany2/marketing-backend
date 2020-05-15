import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { AudienceService } from './../Audience/audience.service';
import { CampaignService } from './../Campaign/campaign.service';

@Injectable()
export class SeederService {
	constructor(
		private audienceService: AudienceService,
		private campaignService: CampaignService,
	) {}

	createAudiences(userId: string, companyId: string, totalAudiences: number) {
		var firstName, lastName;
		try {
			for (let index = 0; index < totalAudiences; index++) {
				firstName = faker.name.firstName();
				lastName = faker.name.lastName();
				this.audienceService.createAudience({
					companyId,
					userId,
					email: (firstName + '.' + lastName + '@mailinator.com').toLowerCase(),
					firstName: firstName,
					lastName: lastName,
					phone: faker.phone.phoneNumber('0987#######'),
					source: 'website',
				});
			}
			return `Created ${totalAudiences} campaigns`;
		} catch (error) {
			return error;
		}
	}

	deleteAudiences() {
		try {
			return this.audienceService.deleteAllAudience();
		} catch (error) {
			return error;
		}
	}

	async createCampaigns(totalCampaigns: number, templateId, companyId) {
		try {
			let audiences = await this.audienceService.getAllAudience(companyId);

			for (let index = 0; index < totalCampaigns; index++) {
				let audienceDataArray = [];
				audiences.forEach((audience) => {
					let ifOpened = faker.random.boolean();
					audienceDataArray.push({
						email: audience.email,
						time: faker.date.past(),
						event: {
							delivered: true,
							open: ifOpened,
							bounce: 0,
							click: ifOpened && faker.random.boolean(),
						},
					});
				});

				this.campaignService.createCampaignOnly({
					companyId,
					name: faker.company.catchPhrase(),
					description: faker.lorem.sentences(),
					templateId,
					sgTemplateId: templateId,
					audiences: audienceDataArray,
				});
			}
			return `Created ${totalCampaigns} campaigns`;
		} catch (e) {
			return e;
		}
	}

	async deleteCampaigns() {
		try {
			return this.campaignService.deleteAllCampaigns();
		} catch (error) {
			return error;
		}
	}
}
