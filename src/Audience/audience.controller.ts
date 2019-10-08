import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AudienceService } from './audience.service';
import { CreateAudienceDto } from './dto/create-audience.dto';

// @UseGuards(AuthGuard('jwt'))
@Controller('audience')
export class AudienceController {
  constructor(private audienceService: AudienceService) { }

  @Post()
  async createAudience(@Body() audienceData: CreateAudienceDto) {
    return await this.audienceService.createAudience(audienceData).catch(e => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));

  }

  @Get()
  getAllAudience() {
    return "something";
  }
}
