import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudienceModule } from './Audience/audience.module';
import { CampaignModule } from './Campaign/campaign.module';
import { FileModule } from './File/file.module';
import { TemplateModule } from './Templates/template.module';
import { UserModule } from './User/user.module';
const { combine, timestamp, prettyPrint } = winston.format;

const dbPath =
	process.env.NODE_ENV === 'development'
		? 'mongodb://marketing_mongo_1/marketingDb'
		: 'mongodb://localhost/marketingDb';
@Module({
	imports: [
		// MongooseModule.forRoot('mongodb://localhost/marketingDb', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }),
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRoot(dbPath, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		}),
		WinstonModule.forRoot({
			level: 'info',
			format: combine(timestamp(), prettyPrint()),
			transports: [
				new winston.transports.File({ filename: 'error.log', level: 'error' }),
				new winston.transports.File({ filename: 'combined.log' }),
			],
		}),

		UserModule,
		AudienceModule,
		FileModule,
		TemplateModule,
		CampaignModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
