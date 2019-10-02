import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { rootDirPath } from '../config';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [MulterModule.register({
    dest: rootDirPath + '/uploads',
  })],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {

}
