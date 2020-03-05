import { Injectable } from '@nestjs/common';
const sgMail = require('@sendgrid/mail');

@Injectable()
export class EmailService {
	sendMail() {
		sgMail.setApiKey(process.env.SENDGRID_KEY);
		const msg = {
			to: 'akusang@gmail.com',
			from: 'admin@lioncrm.com',
			subject: 'Sending with Twilio SendGrid is Fun',
			text: 'and easy to do anywhere, even with Node.js',
			html: '<strong>and easy to do anywhere, even with Node.js</strong>',
		};
		sgMail.send(msg);
	}
}
