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
    userId: String,
    name: String,
    surname: String,
    email: String,
    phone: Number,
    source: String,
    addedBy: String,
    modifiedBy: String,
    lastPurchaseAt: Date,
    coupons: [CouponSchema],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
