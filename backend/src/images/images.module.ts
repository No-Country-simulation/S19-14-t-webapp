import { forwardRef, Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ConfigModule } from '@nestjs/config';
import { imagesProviders } from './images.repository';
import { usersProviders } from 'src/users/users.repository';
import { portfoliosProviders } from 'src/portfolios/portfolios.repository';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/config/database.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { ServicesModule } from 'src/services/services.module';
import { servicesProviders } from 'src/services/services.repository';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    PortfoliosModule,
    forwardRef(() => ServicesModule),
    ConfigModule,
  ],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    ...imagesProviders,
    ...usersProviders,
    ...portfoliosProviders,
    ...servicesProviders,
  ],
  exports: [...imagesProviders, ImagesService],
})
export class ImagesModule {}
