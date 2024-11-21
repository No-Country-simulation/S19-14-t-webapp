import { Module } from '@nestjs/common';
import { OccupationsService } from './occupations.service';
import { OccupationsController } from './occupations.controller';
import { DatabaseModule } from 'src/config/database.module';
import { ocupationsProviders } from './occupations.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [OccupationsController],
  providers: [OccupationsService, ...ocupationsProviders],
  exports: [...ocupationsProviders],
})
export class OccupationsModule {}
