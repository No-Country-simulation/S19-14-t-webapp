import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { OccupationsModule } from './ocupations/occupations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
    ServicesModule,
    AuthModule,
    OccupationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
