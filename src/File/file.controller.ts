import { Controller, Get, Logger, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  private logger = new Logger(FileController.name);

  constructor(private fileService: FileService) { }

  @Get()
  checkFile() {
    return "File upload module is running!";
  }

  @Post('uploadDataSource')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files) {

    // this.logger(file);
    // file - path (with filename), fieldname, filename, size, originalname, mimetype
    // return await setTimeout(() => {
    //   const excelData = this.fileService.convertExcelToJSON(files[0].path);
    //   this.fileService.deleteFile(files[0].path);
    //   return excelData;
    // }, 3000);
    // return "lul";

    const excelData = await this.fileService.convertExcelToJSON(files[0].path);
    this.fileService.deleteFile(files[0].path);
    return excelData;
  }
}
