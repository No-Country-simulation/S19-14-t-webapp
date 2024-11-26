import { forwardRef, Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { DatabaseModule } from 'src/config/database.module';
import { servicesProviders } from './services.repository';
import { imagesProviders } from 'src/images/images.repository';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => ImagesModule)],
  controllers: [ServicesController],
  providers: [ServicesService, ...servicesProviders, ...imagesProviders],
  exports: [ServicesService, ...servicesProviders],
})
export class ServicesModule {}
