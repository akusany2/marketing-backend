import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { readdirSync, readFileSync } from 'fs';
import { Model } from 'mongoose';
import { CreateTemplateDTO } from './interfaces/createTemplateDTO';
import { TemplateInterface } from './interfaces/template.interface';

@Injectable()
export class TemplateService {
	private logger = new Logger(TemplateService.name);
	constructor(
		@InjectModel('template')
		private readonly templateModel: Model<TemplateInterface>,
	) {}
	templatePath = './src/Templates/email-templates/';
	async getAllTemplates() {
		const templates = [];

		try {
			const files = await readdirSync(this.templatePath);
			files.forEach((file) => {
				if (file.toLowerCase().indexOf('.html') > 0) {
					const fileNameExt = file.split('.');
					templates.push({
						name: fileNameExt[1],
						templateId: fileNameExt[0],
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

	async getUserEmailTemplates() {
		const templates = this.templateModel.find({}, (err, templates) => {
			if (err)
				return new HttpException('Template not found', HttpStatus.NOT_FOUND);
			console.log(templates);
		});
		return await templates;
	}
	async updateTemplate(data) {
		const template = await this.templateModel.findByIdAndUpdate(
			data.templateId,
			data,
			{ new: true },
			(err, doc) => {
				return new HttpException(
					'template path not found',
					HttpStatus.NOT_FOUND,
				);
				// return err;
			},
		);
		return await template.save();
	}

	// async updateAudienceTemplate(data) {
	// 	const template = await this.templateModel.findByIdAndUpdate(
	// 		data.id,
	// 		{
	// 			audiences: data.audiences,
	// 		},
	// 		{ new: true },
	// 		(err, doc) => {
	// 			if (err) {
	// 				return new HttpException(
	// 					'template path not found',
	// 					HttpStatus.NOT_FOUND,
	// 				);
	// 			}
	// 			// return err;
	// 		},
	// 	);
	// 	await template.save();
	// 	return await template;
	// }
	async createTemplate(templateData: CreateTemplateDTO) {
		const template = this.templateModel(templateData);
		await template.save();
		return await template;
	}
}
