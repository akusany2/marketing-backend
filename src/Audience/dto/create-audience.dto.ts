export class CreateAudienceDto {
	companyId: string;
	userId: string;
	firstName: string;
	lastName: string;
	phone: number;
	email: string;
	source: string;
	type: string;
	addedBy?: string;
	modifiedBy?: string;
	updatedAt?: string;
	lastPurchaseAt?: string;
}
