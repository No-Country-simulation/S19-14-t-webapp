import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.repository';
import { DatabaseModule } from 'src/config/database.module';
import { ocupationsProviders } from 'src/ocupations/occupations.repository';
import { imagesProviders } from 'src/images/images.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...usersProviders,
    ...ocupationsProviders,
    ...imagesProviders,
  ],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
