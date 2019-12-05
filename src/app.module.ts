import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudienceModule } from './Audience/audience.module';
import { FileModule } from './File/file.module';
import { ConnectionService } from './Shared/connection.service';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/marketingDb'),
    MongooseModule.forRootAsync({
      useClass: ConnectionService,
    }),
    UserModule,
    AudienceModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
