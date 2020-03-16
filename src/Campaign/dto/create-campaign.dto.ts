import { CampaignAudienceInterface } from '../interfaces/campaignAudience.interface';

export class CreateCampaignDto {
	_id?: string;
	companyId: string;
	name: string;
	sgTemplateId: string;
	templateId: string;
	description: string;
	audiences: [CampaignAudienceInterface];
}
