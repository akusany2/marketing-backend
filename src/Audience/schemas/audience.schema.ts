import * as mongoose from 'mongoose';

export const CouponSchema = new mongoose.Schema(
  {
    couponId: String,
    redeemed: Boolean,
    redeemedAt: Date,
  },
);

export const AudienceSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
    phone: Number,
    source: String,
    addedBy: String,
    modifiedBy: String,
    updatedAt: Date,
    lastPurchaseAt: Date,
    coupons: [CouponSchema],
  },
  { createdAt: 'createdAt' },
);
