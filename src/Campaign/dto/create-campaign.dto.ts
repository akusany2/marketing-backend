import { CampaignAudienceInterface } from '../interfaces/campaignAudience.interface';

export class CreateCampaignDto {
	companyId: string;
	name: string;
	sgTemplateId: string;
	templateId: string;
	description: string;
	audiences: [CampaignAudienceInterface];
}
