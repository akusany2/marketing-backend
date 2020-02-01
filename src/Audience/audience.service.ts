import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailService } from '../Shared/email.service';
import { CreateAudienceDto } from './dto/create-audience.dto';
import { Audience } from './interfaces/audience.interface';

@Injectable()
export class AudienceService {
  private logger = new Logger(AudienceService.name);
  constructor(
    @InjectModel('audience') private readonly audienceModel: Model<Audience>,
    private emailService: EmailService,
  ) { }

  async createAudience(audienceData: CreateAudienceDto) {
    const audience = this.audienceModel(audienceData);
    await audience.save();
    // this.emailService.sendMail();
    return await audience;
  }

  async getAllAudience(userId) {
    return await this.audienceModel.find(
      { userId },
      null,
      { sort: { createdAt: -1 } },
      (err, data) => {
        if (err) {
          return err;
        }

        return data;
      },
    );
  }

  async deleteAudience(id) {
    return await this.audienceModel.findByIdAndDelete(id);
  }

  async editAudience(audienceData) {
    const audience = await this.audienceModel.findByIdAndUpdate(audienceData._id, audienceData, { new: true }, (err, doc) => {
      return err;
    });
    await audience.save();
    return await audience;
  }
}
