import { Module } from '@nestjs/common';
import { EmailService } from '../Shared/email.service';
import { ExternalController } from './external.controller';

@Module({
	controllers: [ExternalController],
	providers: [EmailService],
})
export class ExternalModule {}
