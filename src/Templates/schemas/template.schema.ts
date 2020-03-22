import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema(
	{
		companyId: String,
		templateName: String,
		subject: String,
		templateId: String,
		templateHtml: String,
		templateMetaData: Object,
		description: String,
		audiences: Array,
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
