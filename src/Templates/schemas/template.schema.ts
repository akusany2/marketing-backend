import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema(
  {
    companyId: String,
    name: String,
    htmlTemplate: String,
    description: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
