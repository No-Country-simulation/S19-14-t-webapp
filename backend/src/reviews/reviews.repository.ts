import { Review } from './entities/review.entity';

export const reviewsProviders = [
  {
    provide: 'REVIEW_REPOSITORY',
    useValue: Review,
  },
];
