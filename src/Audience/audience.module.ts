import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailService } from '../Shared/email.service';
import { AudienceController } from './audience.controller';
import { AudienceService } from './audience.service';
import { AudienceSchema } from './schemas/audience.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'audience', schema: AudienceSchema }])],
  controllers: [AudienceController],
  providers: [AudienceService, EmailService],
})
export class AudienceModule { }
