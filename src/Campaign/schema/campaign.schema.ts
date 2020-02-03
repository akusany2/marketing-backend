import * as mongoose from 'mongoose';

export const CampaignSchema = new mongoose.Schema(
  {
    companyId: String,
    name: String,
    templateId: String,
    description: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
