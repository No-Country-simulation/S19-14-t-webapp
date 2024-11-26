import { Service } from './entities/service.entity';

export const servicesProviders = [
  {
    provide: 'SERVICE_REPOSITORY',
    useValue: Service,
  },
];
