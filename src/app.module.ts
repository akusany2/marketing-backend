import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudienceModule } from './Audience/audience.module';
import { FileModule } from './File/file.module';
import { TemplateModule } from './Templates/template.module';
import { UserModule } from './User/user.module';

const dbPath = process.env.NODE_ENV === 'development' ? 'mongodb://marketing_mongo_1/marketingDb' : 'mongodb://localhost/marketingDb';
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/marketingDb', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }),
    MongooseModule.forRoot(dbPath, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }),
    // MongooseModule.forRootAsync({
    //   useClass: ConnectionService,
    // }),
    UserModule,
    AudienceModule,
    FileModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
