import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Image } from 'src/images/entities/image.entity';
import { ImagesService } from 'src/images/images.service';
import { Op } from 'sequelize';
import { Category } from 'src/categories/entities/category.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ServicesService {
  constructor(
    @Inject(forwardRef(() => ImagesService))
    private imagesService: ImagesService,
    @Inject('SERVICE_REPOSITORY')
    private serviceRepository: typeof Service,
  ) {}

  create(createServiceDto: CreateServiceDto) {
    const serviceData = {
      ...createServiceDto,
    };
    return this.serviceRepository.create(serviceData);
  }

  findAllByUser(id: number) {
    return this.serviceRepository.findAll({
      where: { userId: id },
      include: [Image],
    });
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({
      where: { id },
      include: [
        Image,
        Category,
        {
          model: Review,
          include: [
            {
              model: User,
              attributes: ['name'],
              include: [
                {
                  model: Image,
                  attributes: ['imageUrl'],
                },
              ],
            },
          ],
        },
      ],
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    const serviceData = {
      ...updateServiceDto,
    };
    return this.serviceRepository.update(serviceData, { where: { id } });
  }

  async remove(id: number) {
    const service = await this.findOne(id);
    if (service.images.length > 0) {
      await Promise.all(
        service.images.map(async (image) => {
          await this.imagesService.deleteImage(image.public_id);
          await image.destroy();
        }),
      );
    }
    return this.serviceRepository.destroy({ where: { id } });
  }

  findByKeyword(keyword: string) {
    console.log('Keyword:', keyword);
    return this.serviceRepository.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            summary: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
      include: [Image],
    });
  }

  findByAll(keyword: string, min: string, max: string) {
    const whereClause: any = {
      [Op.and]: [
        {
          [Op.or]: [
            { title: { [Op.like]: `%${keyword}%` } },
            { summary: { [Op.like]: `%${keyword}%` } },
            { description: { [Op.like]: `%${keyword}%` } },
            { '$category.name$': { [Op.like]: `%${keyword}%` } },
          ],
        },
        {
          price: {
            [Op.between]: [+min || 0, +max || Number.MAX_VALUE],
          },
        },
      ],
    };

    return this.serviceRepository.findAll({
      include: [Category, Image],
      where: whereClause,
    });
  }
}
