import { Image } from './entities/image.entity';

export const imagesProviders = [
  {
    provide: 'IMAGE_REPOSITORY',
    useValue: Image,
  },
];
