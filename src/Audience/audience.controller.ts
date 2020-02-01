import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from '../Shared/email.service';
import { AudienceService } from './audience.service';
import { CreateAudienceDto } from './dto/create-audience.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('audience')
export class AudienceController {
  constructor(private audienceService: AudienceService, private emailService: EmailService) { }

  @Post()
  async createAudience(@Body() audienceData: CreateAudienceDto) {
    return await this.audienceService
      .createAudience(audienceData)
      .catch(e => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
  }

  @Get()
  async getAllAudience(@Req() req) {
    return await this.audienceService
      .getAllAudience(req.user.userId)
      .catch(e => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
  }

  @Delete(':id')
  async deleteAudience(@Param('id') id: string) {
    return await this.audienceService
      .deleteAudience(id)
      .catch(e => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
  }

  @Put()
  async updateAudience(@Body() audienceData: CreateAudienceDto) {
    return await this.audienceService
      .editAudience(audienceData)
      .catch(e => new HttpException(e, HttpStatus.SERVICE_UNAVAILABLE));
  }
}
