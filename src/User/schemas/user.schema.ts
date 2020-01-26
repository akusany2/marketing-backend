import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    role: String,
    name: String,
    surname: String,
    department: String,
    poistionInCompany: String,
    email: String,
    phone: Number,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
