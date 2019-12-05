import { Global, Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Request } from 'express';

@Global()
@Injectable({ scope: Scope.REQUEST })
export class ConnectionService implements MongooseOptionsFactory {
  private logger = new Logger(ConnectionService.name);
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  createMongooseOptions(): MongooseModuleOptions {
    this.logger.log(this.request.params);
    return {
      uri: 'mongodb://localhost/marketingDb',
    };
  }
}
