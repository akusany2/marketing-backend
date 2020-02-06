import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTemplateDTO } from './interfaces/createTemplateDTO';
import { TemplateService } from './template.service';

@UseGuards(AuthGuard('jwt'))
@Controller('template')
export class TemplateController {
  constructor(private templateService: TemplateService) { }

  @Post()
  async createTemplate(@Body() template: CreateTemplateDTO) {
    return await this.templateService.createTemplate(template);
  }

  @Get('all')
  async getAllTemplates() {
    return await this.templateService.getAllTemplates();
  }

  @Get(':name')
  async getTemplate(@Param('name') name: string) {
    return await this.templateService.getTemplate(name);
  }


}
