import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { OccupationsService } from './occupations.service';
import { CreateOccupationDto } from './dto/create-occupation.dto';

@Controller('occupations')
export class OccupationsController {
  constructor(private readonly occupationsService: OccupationsService) {}

  @Post()
  create(@Body(ValidationPipe) createOcupationDto: CreateOccupationDto) {
    return this.occupationsService.create(createOcupationDto);
  }

  @Get()
  findAll() {
    return this.occupationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occupationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.occupationsService.remove(+id);
  }
}
