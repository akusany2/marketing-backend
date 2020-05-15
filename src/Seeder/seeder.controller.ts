import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { SeederGuard } from './seeder.guard';
import { SeederService } from './seeder.service';

@UseGuards(SeederGuard)
@Controller('seed')
export class SeederController {
	constructor(private seederService: SeederService) {}
	@Get('audience/create')
	audienceCreate(@Body() { userId, companyId, totalAudience }) {
		return (
			totalAudience &&
			companyId &&
			this.seederService.createAudiences(userId, companyId, totalAudience)
		);
	}

	@Get('audience/delete')
	audienceDelete() {
		return this.seederService.deleteAudiences();
	}

	@Get('campaign/create')
	campaignCreate(@Body()
	{
		totalCampaigns,
		sgTemplateId,
		templateId,
		companyId,
	}) {
		return this.seederService.createCampaigns(
			totalCampaigns,
			templateId,
			companyId,
		);
	}

	@Get('campaign/delete')
	campaignDelete() {
		return this.seederService.deleteCampaigns();
	}
}
