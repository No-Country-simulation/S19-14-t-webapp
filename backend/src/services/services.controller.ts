import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body(ValidationPipe) createServiceDto: CreateServiceDto,
  ) {
    const serviceData = {
      ...createServiceDto,
      userId: +id,
    };
    return this.servicesService.create(serviceData);
  }

  @Get('all/:id')
  findAll(@Param('id') id: string) {
    return this.servicesService.findAllByUser(+id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = await this.servicesService.findOne(+id);
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }
    return service;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateServiceDto: UpdateServiceDto,
  ) {
    const service = await this.servicesService.findOne(+id);
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }

    this.servicesService.update(+id, updateServiceDto);
    return 'Servicio con el id: ' + id + ' actualizado correctamente';
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const service = await this.servicesService.findOne(+id);
    if (!service) {
      throw new NotFoundException('Servicio no encontrado');
    }
    this.servicesService.remove(+id);
    return 'Servicio con el id: ' + id + ' eliminado correctamente';
  }
}
