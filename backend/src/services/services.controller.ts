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
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ApiQuery } from '@nestjs/swagger';

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

  @Get()
  @ApiQuery({
    name: 'min',
    type: String,
    description: 'el valor minimo del precio',
    required: false,
  })
  @ApiQuery({
    name: 'max',
    type: String,
    description: 'el valor maximo del precio',
    required: false,
  })
  async searchWithKeywords(
    @Query('keyword') keyword?: string,
    @Query('min', new DefaultValuePipe('0')) min?: string,
    @Query('max', new DefaultValuePipe('9999')) max?: string,
  ) {
    return this.servicesService.findByAll(keyword, min, max);
  }
}
