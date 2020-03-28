import * as mongoose from 'mongoose';

export const CouponSchema = new mongoose.Schema({
	couponId: String,
	text: String, // should be same as condtion defined by bussiness
	redeemed: Boolean,
	redeemedAt: Date,
});

export const AudienceSchema = new mongoose.Schema(
	{
		userId: String,
		firstName: String,
		lastName: String,
		email: String,
		phone: Number,
		source: String,
		unsubscribed: Boolean,
		addedBy: String,
		modifiedBy: String,
		lastPurchaseAt: Date,
		coupons: [CouponSchema],
	},
	{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
