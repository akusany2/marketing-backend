import * as mongoose from 'mongoose';

const SurveyAudienceSchema = new mongoose.Schema({
	firstName: String,
	phone: String,
	userData: Object,
	time: Number,
	event: Object,
});

export const SurveySchema = new mongoose.Schema(
	{
		companyId: String,
		name: String,
		message: String,
		surveyURL: String,
		formJson: String,
		description: String,
		audiences: [SurveyAudienceSchema],
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
