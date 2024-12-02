import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/config/database.module';
import { categoriesProviders } from './categories.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoriesProviders],
  exports: [...categoriesProviders],
})
export class CategoriesModule {}
