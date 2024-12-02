import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/categories/entities/category.entity';
import { Image } from 'src/images/entities/image.entity';
import { Review } from 'src/reviews/entities/review.entity';
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  categoryId: string;

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

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Review)
  reviews: Review[];
}
