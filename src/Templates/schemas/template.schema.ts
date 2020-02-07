import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema(
	{
		companyId: String,
		templateName: String,
		templateHtml: String,
		description: String,
		audiences: Array,
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
