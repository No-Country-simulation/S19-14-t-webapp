import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ConfigModule } from '@nestjs/config';
import { imagesProviders } from './images.repository';
import { usersProviders } from 'src/users/users.repository';
import { portfoliosProviders } from 'src/portfolios/portfolios.repository';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/config/database.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';

@Module({
  imports: [DatabaseModule, UsersModule, PortfoliosModule, ConfigModule],
  controllers: [ImagesController],
  providers: [
    ImagesService,
    ...imagesProviders,
    ...usersProviders,
    ...portfoliosProviders,
  ],
  exports: [...imagesProviders],
})
export class ImagesModule {}
