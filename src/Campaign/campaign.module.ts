import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AudienceService } from '../Audience/audience.service';
import { EmailService } from '../Shared/email.service';
import { CampaignSchema } from './schema/campaign.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'campaign', schema: CampaignSchema }])],
  controllers: [],
  providers: [AudienceService, EmailService],
})
export class TemplateModule { }
