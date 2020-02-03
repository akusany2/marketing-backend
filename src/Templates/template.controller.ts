import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TemplateService } from './template.service';

@UseGuards(AuthGuard('jwt'))
@Controller('template')
export class TemplateController {
  constructor(private templateService: TemplateService) { }

  @Get('all')
  async getAllTemplates() {
    return await this.templateService.getAllTemplates();
  }

  @Get(':name')
  async getTemplate(@Param('name') name: string) {
    return await this.templateService.getTemplate(name);
  }
}
