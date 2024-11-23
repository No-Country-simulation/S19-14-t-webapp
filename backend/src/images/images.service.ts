import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { UsersService } from 'src/users/users.service';
import { Image } from './entities/image.entity';
import { PortfoliosService } from 'src/portfolios/portfolios.service';

@Injectable()
export class ImagesService {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
    private portfolioService: PortfoliosService,
    @Inject('IMAGE_REPOSITORY')
    private readonly imageRepository: typeof Image,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async getImage(publicId: string): Promise<string> {
    try {
      const result = await cloudinary.api.resource('oficiosya/' + publicId);
      return result.secure_url;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Image not found');
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy('oficiosya/' + publicId);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async saveUserImage(
    userId: string,
    filePath: string,
    fileName: string,
  ): Promise<void> {
    const user = await this.userService.findOne(+userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.image) {
      await this.deleteImage(user.image.public_id);
      await user.image.destroy();
    }

    const publicId = fileName.split('/')[1];

    const image = await this.imageRepository.create({
      imageUrl: filePath,
      user_id: +userId,
      public_id: publicId,
    });

    const newUser = {
      ...user,
      image_id: image.id,
    };
    await this.userService.update(+userId, newUser);
  }

  async savePortfolioImage(
    portfolioId: string,
    filePath: string,
    fileName: string,
  ): Promise<void> {
    const portfolio = await this.portfolioService.findOne(+portfolioId);

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }

    if (portfolio.image) {
      await this.deleteImage(portfolio.image.public_id);
      await portfolio.image.destroy();
    }

    const publicId = fileName.split('/')[1];

    const image = await this.imageRepository.create({
      imageUrl: filePath,
      portfolio_id: +portfolioId,
      public_id: publicId,
    });

    const newPortfolio = {
      ...portfolio,
      image_id: image.id,
    };

    await this.portfolioService.update(+portfolioId, newPortfolio);
  }
}
