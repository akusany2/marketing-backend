import * as mongoose from 'mongoose';
import { UserSchema } from './user.schema';

export const CompanySchema = new mongoose.Schema(
  {
    companyId: { type: String, unique: true },
    companyName: String,
    address: String,
    users: [UserSchema],
  }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
