import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AudienceService } from '../Audience/audience.service';
import { EmailService } from '../Shared/email.service';

@UseGuards(AuthGuard('jwt'))
@Controller('campaign')
export class CampaignController {
  constructor(private audienceService: AudienceService, private emailService: EmailService) { }

}
