import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Image } from 'src/images/entities/image.entity';
import { Occupation } from 'src/ocupations/entities/occupation.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const connectionData = {
        host: configService.get<string>('MYSQL_HOST'),
        port: configService.get<number>('MYSQL_PORT'),
        username: configService.get<string>('MYSQL_USERNAME'),
        password: configService.get<string>('MYSQL_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE'),
      };
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: connectionData.host,
        port: connectionData.port,
        username: connectionData.username,
        password: connectionData.password,
        database: connectionData.database,
      });
      sequelize.addModels([User, Occupation, Portfolio, Image]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
