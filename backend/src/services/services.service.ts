import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Image } from 'src/images/entities/image.entity';
import { ImagesService } from 'src/images/images.service';

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
      where: { user_id: id },
    });
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({
      where: { id },
      include: [Image],
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
}
