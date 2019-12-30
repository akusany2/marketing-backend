import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAudienceDto } from './dto/create-audience.dto';
import { Audience } from './interfaces/audience.interface';

@Injectable()
export class AudienceService {
  private logger = new Logger(AudienceService.name);
  constructor(
    @InjectModel('audience') private readonly audienceModel: Model<Audience>,
  ) {}

  async createAudience(audienceData: CreateAudienceDto) {
    // this.logger.log(auwdienceData);

    const audience = this.audienceModel(audienceData);
    await audience.save();
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
}
