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
    department: String,
    poistionInCompany: String,
    email: String,
    phone: Number,
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);

export const CompanySchema = new mongoose.Schema(
  {
    companyId: { type: String, unique: true },
    companyName: String,
    address: String,
    users: [UserSchema],
  }, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
