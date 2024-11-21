import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { DatabaseModule } from 'src/config/database.module';
import { portfoliosProviders } from './portfolios.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PortfoliosController],
  providers: [PortfoliosService, ...portfoliosProviders],
  exports: [...portfoliosProviders],
})
export class PortfoliosModule {}
