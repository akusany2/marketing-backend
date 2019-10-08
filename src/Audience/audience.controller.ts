import { Controller, Get, Post } from '@nestjs/common';
import { AudienceService } from './audience.service';
import { CreateAudienceDto } from './dto/create-audience.dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('audience')
export class AudienceController {
  constructor(private audienceService: AudienceService) { }

  @Post()
  createAudience(audienceData: CreateAudienceDto) {
    return this.audienceService.createAudience(audienceData);

  }

  @Get()
  getAllAudience() {
    return "something";
  }
}
