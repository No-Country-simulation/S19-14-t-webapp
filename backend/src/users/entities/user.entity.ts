import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { Image } from 'src/images/entities/image.entity';
import { Occupation } from 'src/ocupations/entities/occupation.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { Service } from 'src/services/entities/service.entity';

@Table
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('ADMIN', 'CLIENT', 'SERVICE'),
    allowNull: false,
    defaultValue: 'CLIENT',
  })
  role: string;

  @ForeignKey(() => Image)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  image_id: number;

  @ForeignKey(() => Occupation)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  occupation_id: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING(120),
    allowNull: true,
  })
  summary: string;

  @Column({
    type: DataType.STRING(45),
    allowNull: true,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  linkedin: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  social_media: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  last_seen: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  location: string;

  @BelongsTo(() => Occupation)
  occupation: Occupation;

  @HasMany(() => Portfolio)
  portfolios: Portfolio[];

  @HasOne(() => Image)
  image: Image;

  @HasMany(() => Service)
  services: Service[];
}
