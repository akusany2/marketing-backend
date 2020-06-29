import { SurveyAudienceInterface } from './suervyAudinece.interface';
export class SurveyInterface {
	name: string;
	message: string;
	companyId: string;
	description: string;
	audiences: SurveyAudienceInterface[];
}
