
import { Injectable, Logger } from '@nestjs/common';
import * as excelToJSON from "convert-excel-to-json";
import { unlink } from 'fs';

@Injectable()
export class FileService {
  private logger = new Logger(FileService.name);
  async convertExcelToJSON(path: string) {
    return await excelToJSON({
      sourceFile: path,
      header: {
        rows: 1,
      },
      columnToKey: {
        '*': '{{columnHeader}}',
      },
    });
  }
  async deleteFile(path: string) {
    await unlink(path, err => {
      if (err) {
        this.logger.log(err);
        return;
      }
      return true;
    });
  }
}
