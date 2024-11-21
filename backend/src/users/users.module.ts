import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.repository';
import { DatabaseModule } from 'src/config/database.module';
import { ocupationsProviders } from 'src/ocupations/occupations.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, ...ocupationsProviders],
  exports: [UsersService],
})
export class UsersModule {}
