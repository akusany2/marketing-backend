import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readdirSync, readFileSync } from 'fs';
import { Model } from 'mongoose';
import { TemplateInterface } from './interfaces/template.interface';

@Injectable()
export class TemplateService {
  private logger = new Logger(TemplateService.name);
  constructor(
    @InjectModel('template') private readonly templateModel: Model<TemplateInterface>,
  ) { }
  templatePath = './src/Templates/email-templates/';
  async getAllTemplates() {
    const templates = [];

    try {
      const files = await readdirSync(this.templatePath);
      files.forEach(file => {
        if (file.toLowerCase().indexOf('.html') > 0) {
          const fileNameExt = file.split('.');
          templates.push({
            name: fileNameExt[0],
            // image64: readFileSync(this.templatePath + file).toString('base64'),
          });
        }
      });
      return templates;
    } catch (err) {
      return new HttpException('template path not found', HttpStatus.NOT_FOUND);
    }
  }

  async getTemplate(name) {
    try {
      return await readFileSync(this.templatePath + name + '.html', 'utf8');
    } catch (err) {
      return new HttpException('template path not found', HttpStatus.NOT_FOUND);
    }
  }
}
