import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UnauthorizedException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post(':service_id')
  create(
    @Param('service_id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const reviewData = {
      ...createReviewDto,
      service_id: +id,
    };
    return this.reviewsService.create(reviewData);
  }

  @Get(':service_id')
  findAllByService(@Param('service_id') id: string) {
    return this.reviewsService.findAllByService(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  //validar con guards mas adelante
  @Delete(':id')
  async remove(@Param('id') id: string, @Query('user_id') user_id: string) {
    const review = await this.reviewsService.findOne(+id);
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    if (review.user_id !== +user_id) {
      throw new UnauthorizedException('You can only delete your own reviews');
    }
    return this.reviewsService.remove(+id);
  }
}
