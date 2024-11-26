import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';

@Table
export class Service extends Model {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  summary: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  description: string;

  @Column({
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Image)
  images: Image[];
}
