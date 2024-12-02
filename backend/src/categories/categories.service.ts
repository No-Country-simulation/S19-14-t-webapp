import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: typeof Category,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    const categoryData = {
      ...createCategoryDto,
    };
    return this.categoriesRepository.create(categoryData);
  }

  findAll() {
    return this.categoriesRepository.findAll();
  }

  findOne(id: number) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    this.categoriesRepository.destroy({ where: { id } });
    return 'La categoría de id ' + id + ' se eliminó correctamente';
  }
}
