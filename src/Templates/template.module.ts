import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSchema } from './schemas/template.schema';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'template', schema: TemplateSchema }])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule { }
