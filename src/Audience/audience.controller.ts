import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AudienceService } from './audience.service';
import { CreateAudienceDto } from './dto/create-audience.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('audience')
export class AudienceController {
  constructor(private audienceService: AudienceService) { }

  @Post()
  async createAudience(@Body() audienceData: CreateAudienceDto) {
    return await this.audienceService.createAudience(audienceData).catch(e => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));

  }

  @Get()
  async getAllAudience(@Req() req) {
    return await this.audienceService.getAllAudience(req.user.userId).catch(e => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
  }
}
