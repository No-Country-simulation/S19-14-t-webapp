import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Delete,
  ParseFilePipeBuilder,
  HttpStatus,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: () => {
    return {
      folder: 'oficiosya',
    };
  },
});

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('users/:id')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadUserImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File,
  ) {
    await this.imagesService.saveUserImage(id, file.path, file.filename);
    return {
      imageUrl: file.path,
      message: 'Image uploaded successfully',
    };
  }

  @Post('portfolios/:id')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadPortfolioImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    await this.imagesService.savePortfolioImage(id, file.path, file.filename);
    return {
      imageUrl: file.path,
      publicId: file.filename,
      message: 'Image uploaded successfully',
    };
  }

  @Post('services/:id')
  @UseInterceptors(FilesInterceptor('files', 6, { storage }))
  async uploadMultipleFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    files.map(async (file) => {
      return await this.imagesService.saveServiceImage(
        id,
        file.path,
        file.filename,
      );
    });
    return {
      images: files.map((file) => file.path),
      message: 'Images uploaded successfully',
    };
  }

  @Get(':publicId')
  async getImage(@Param('publicId') publicId: string) {
    const imageUrl = await this.imagesService.getImage(publicId);
    return { imageUrl };
  }

  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    await this.imagesService.deleteImage(publicId);
    return { message: 'Image deleted successfully' };
  }
}
