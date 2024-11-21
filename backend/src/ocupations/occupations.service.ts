import { Inject, Injectable } from '@nestjs/common';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { Occupation } from './entities/occupation.entity';

@Injectable()
export class OccupationsService {
  constructor(
    @Inject('OCCUPATION_REPOSITORY')
    private occupationsRepository: typeof Occupation,
  ) {}
  create(createOcupationDto: CreateOccupationDto) {
    const occupationData = {
      ...createOcupationDto,
    };
    return this.occupationsRepository.create(occupationData);
  }

  findAll() {
    return this.occupationsRepository.findAll();
  }

  findOne(id: number) {
    return this.occupationsRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.occupationsRepository.destroy({ where: { id } });
  }
}
