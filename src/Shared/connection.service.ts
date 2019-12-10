import { Global, Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Global()
@Injectable()
export class ConnectionService implements MongooseOptionsFactory {
  // private logger = new Logger(ConnectionService.name);
  constructor(private dbName: string) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.dbName
        ? 'mongodb://localhost/' + this.dbName
        : 'mongodb://localhost/marketingDb',
    };
  }
}
