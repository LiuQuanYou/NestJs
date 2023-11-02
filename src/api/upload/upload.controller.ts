import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  MethodNotAllowedException,
  HttpException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { upload, fileMimetypeFilter } from './upload';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: Math.pow(1024, 2) * 2 },
      fileFilter: fileMimetypeFilter('image'),
    }),
  )
  image(@UploadedFile() file: Express.Multer.File) {
    var filePath = file.path.replace(/\\/g, '/');
    console.log(filePath)
    return {
      code: HttpStatus.OK,
      file:filePath,
    };
  }
}
