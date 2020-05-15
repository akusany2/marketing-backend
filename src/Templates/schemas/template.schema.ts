import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema(
	{
		companyId: String,
		templateName: String,
		subject: String,
		sgTemplateId: String,
		templateHtml: String,
		templateMetaData: Object,
		description: String,
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
