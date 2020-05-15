import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AudienceController } from './audience.controller';
import { AudienceService } from './audience.service';
import { AudienceSchema } from './schemas/audience.schema';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: 'audience', schema: AudienceSchema }]),
	],
	exports: [AudienceService],
	controllers: [AudienceController],
	providers: [AudienceService],
})
export class AudienceModule {}
