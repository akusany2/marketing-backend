import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    role: String,
    name: String,
    surname: String,
    company: String,
    department: String,
    poistionInCompany: String,
    email: String,
    phone: Number,
  },
  { createdAt: 'createdAt' },
);
