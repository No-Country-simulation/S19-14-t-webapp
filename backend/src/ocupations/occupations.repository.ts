import { Occupation } from './entities/occupation.entity';

export const ocupationsProviders = [
  {
    provide: 'OCCUPATION_REPOSITORY',
    useValue: Occupation,
  },
];
