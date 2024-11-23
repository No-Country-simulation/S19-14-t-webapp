import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { DatabaseModule } from 'src/config/database.module';
import { portfoliosProviders } from './portfolios.repository';
import { imagesProviders } from 'src/images/images.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PortfoliosController],
  providers: [PortfoliosService, ...portfoliosProviders, ...imagesProviders],
  exports: [PortfoliosService, ...portfoliosProviders],
})
export class PortfoliosModule {}
