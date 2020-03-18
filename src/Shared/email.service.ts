import { Injectable } from '@nestjs/common';
import { EasyconfigService } from 'nestjs-easyconfig';
const sgMail = require('@sendgrid/mail');

@Injectable()
export class EmailService {
	constructor(private configService: EasyconfigService) {}
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

	sendCampaign(from: any, personalizations, campaignId, sgTemplateId) {
		sgMail.setApiKey(this.configService.get('SENDGRID_KEY'));
		sgMail.send({
			from: {
				email: from,
			},
			personalizations,
			custom_args: {
				campaign_id: campaignId.toString(),
			},
			template_id: sgTemplateId,
		});
	}
}
