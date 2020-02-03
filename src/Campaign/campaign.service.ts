import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../Shared/email.service';
import { CampaignInterface } from './interfaces/campaign.interface';

@Injectable()
export class CampaignService {
  private logger = new Logger(CampaignService.name);
  constructor(
    @InjectModel('campaign') private readonly campaignModel: Model<CampaignInterface>,
    private emailService: EmailService,
  ) { }

}
