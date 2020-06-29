import { Injectable } from '@nestjs/common';

const twilio = require('twilio')(
	process.env.TWILIO_ACC_SID,
	process.env.TWILIO_AUTH_TOKEN,
);

@Injectable()
export class TwilioService {
	constructor() {}

	sendBulkSMS() {
		const body = 'LionCRM is coming!';
		const numbers = ['+919873258003', '+353861700616'];

		const service = twilio.notify.services(process.env.TWILIO_TEST_NOTIFY_SID);

		const bindings = numbers.map((number) => {
			return JSON.stringify({ binding_type: 'sms', address: number });
		});

		service.notifications
			.create({
				toBinding: bindings,
				body: body,
				identities: 'someguid007',
			})
			.then((notification) => {
				console.log(notification);
			})
			.catch((err) => {
				console.error(err);
			});
	}
}
