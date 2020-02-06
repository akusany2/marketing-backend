import * as mongoose from 'mongoose';

export const TemplateSchema = new mongoose.Schema(
  {
    companyId: String,
    templateName: String,
    templateHtml: String,
    description: String,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
