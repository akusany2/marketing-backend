import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as shortid from 'shortid';
import { CreateAudienceDto } from './dto/create-audience.dto';
import { Audience } from './interfaces/audience.interface';

@Injectable()
export class AudienceService {
	private logger = new Logger(AudienceService.name);
	constructor(
		@InjectModel('audience') private readonly audienceModel: Model<Audience>,
	) {}

	async createAudience(audienceData: CreateAudienceDto) {
		audienceData.displayId = shortid.generate();
		const audience = this.audienceModel(audienceData);
		await audience.save();
		// this.emailService.sendMail();
		return await audience;
	}

	async getAllAudience(companyId) {
		return await this.audienceModel.find(
			{ companyId },
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

	async deleteAllAudience() {
		return await this.audienceModel.remove();
	}

	async editAudience(audienceData) {
		const audience = await this.audienceModel.findByIdAndUpdate(
			audienceData._id,
			audienceData,
			{ new: true },
			(err, doc) => {
				return err;
			},
		);
		await audience.save();
		return await audience;
	}
}
