import { Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @Inject('REVIEW_REPOSITORY')
    private reviewRepository: typeof Review,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    const newReview = {
      ...createReviewDto,
    };
    return this.reviewRepository.create(newReview);
  }

  findAllByService(id: number) {
    return this.reviewRepository.findAll({ where: { service_id: id } });
  }

  findOne(id: number) {
    return this.reviewRepository.findOne({
      where: { id },
    });
  }

  remove(id: number) {
    return this.reviewRepository.destroy({ where: { id } });
  }
}
