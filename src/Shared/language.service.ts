import { Injectable } from '@nestjs/common';

@Injectable()
export class LanguageService {
	database = {
		userDbPrefix: 'user',
	};
	audience = {
		types: { customer: 'customer', nonCustomer: 'nonCustomer' },
	};
}
