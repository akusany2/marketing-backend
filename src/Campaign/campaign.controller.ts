import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('campaign')
export class CampaignController {
	constructor(private campaignService: CampaignService) {}

	@Get()
	async getAllCampaign(companyId) {
		this.campaignService
			.getAllCampaign(companyId)
			.catch((e) => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
	}

	@Post()
	async createCampaign(@Body() campaignData: CreateCampaignDto) {
		return await this.campaignService
			.createCampaign(campaignData)
			.catch((e) => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
	}
}
