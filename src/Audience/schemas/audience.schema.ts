import * as mongoose from 'mongoose';

export const AudienceSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    phone: Number,
    source: String,
  },
  { createdAt: 'createdAt' },
);
