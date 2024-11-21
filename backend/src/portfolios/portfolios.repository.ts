import { Portfolio } from './entities/portfolio.entity';

export const portfoliosProviders = [
  {
    provide: 'PORTFOLIO_REPOSITORY',
    useValue: Portfolio,
  },
];
