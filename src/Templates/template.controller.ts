import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTemplateDTO } from './interfaces/createTemplateDTO';
import { TemplateInterface } from './interfaces/template.interface';
import { TemplateService } from './template.service';

@UseGuards(AuthGuard('jwt'))
@Controller('template')
export class TemplateController {
	constructor(private templateService: TemplateService) {}

	@Post()
	async createTemplate(@Body() template: CreateTemplateDTO) {
		return await this.templateService.createTemplate(template);
	}

	@Get('all')
	async getAllTemplates() {
		return await this.templateService.getAllTemplates();
	}

	@Get('allUserEmail')
	async getUserTemplates() {
		return await this.templateService.getUserEmailTemplates();
	}

	@Get(':name')
	async getTemplate(@Param('name') name: string) {
		return await this.templateService.getTemplate(name);
	}
	@Put()
	async updateTemplate(@Body() templateData: TemplateInterface) {
		return await this.templateService.updateTemplate(templateData);
	}
	// @Put('audience')
	// async updateAudienceInTemplate(@Body() audienceDataAndId) {
	// 	return await this.templateService.updateAudienceTemplate(audienceDataAndId);
	// }
}
