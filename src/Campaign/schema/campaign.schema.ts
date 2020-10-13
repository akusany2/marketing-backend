import * as mongoose from 'mongoose';

// const CampaignAudienceSchema = new mongoose.Schema({
// 	email: String,
// 	userData: Object,
// 	time: Number,
// 	event: Object,
// });

export const CampaignSchema = new mongoose.Schema(
	{
		companyId: String,
		name: String,
		templateId: String,
		sgTemplateId: String,
		description: String,
		audiences: [],
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
