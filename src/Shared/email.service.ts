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

	sendCampaign(campaignId: string, to: Array<string>, templateId: string) {
		sgMail.setApiKey(process.env.SENDGRID_KEY);
		sgMail.send({
			from: {
				email: 'campaign@lioncrm.net',
			},
			personalizations: [
				{
					to: [
						{
							email: 'akusang@gmail.com',
						},
					],
					subject: 'Testing Custom Arguments',
					dynamic_template_data: {
						name: 'something!!',
					},
				},
			],
			custom_args: {
				campaign_id: '1238921',
			},
			template_id: 'd-5e954ae91ea042279c555fc88cb9d9e9',
		});
	}
}
