require('dotenv').config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudienceModule } from './Audience/audience.module';
import { CampaignModule } from './Campaign/campaign.module';
import { ExternalModule } from './External/external.module';
import { FileModule } from './File/file.module';
import { SeederModule } from './Seeder/seeder.module';
import { transports } from './Shared/logConfig';
import { SurveyModule } from './Survey/survey.module';
import { TemplateModule } from './Templates/template.module';
import { UserModule } from './User/user.module';
const { combine, timestamp, prettyPrint } = winston.format;

@Module({
	imports: [
		MongooseModule.forRoot(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		}),
		WinstonModule.forRoot({
			level: 'info',
			format: combine(timestamp(), prettyPrint()),
			transports: transports,
		}),

		UserModule,
		AudienceModule,
		FileModule,
		TemplateModule,
		CampaignModule,
		ExternalModule,
		SurveyModule,
		SeederModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
