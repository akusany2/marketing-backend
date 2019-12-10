import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudienceModule } from './Audience/audience.module';
import { FileModule } from './File/file.module';
import { UserModule } from './User/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/marketingDb'),
    // MongooseModule.forRootAsync({
    //   useClass: ConnectionService,
    // }),
    UserModule,
    AudienceModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  dbName: string;
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply((req, res, next) => {

        MongooseModule.forRoot(this.dbName
          ? 'mongodb://localhost/' + this.dbName
          : 'mongodb://localhost/marketingDb', { useNewUrlParser: true });
      }).forRoutes('*');
  }
}
