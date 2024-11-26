import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
  BeforeValidate,
  ForeignKey,
} from 'sequelize-typescript';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';

@Table
export class Image extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
  })
  imageUrl: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  public_id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  user_id: number;

  @ForeignKey(() => Portfolio)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  portfolio_id: number;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  service_id: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Portfolio)
  portfolio: Portfolio;

  @BelongsTo(() => Service)
  service: Service;

  @BeforeValidate
  static async validateSingleForeignKey(instance: Image) {
    const foreignKeys = [
      instance.user_id,
      instance.portfolio_id,
      instance.service_id,
    ];
    const nonNullKeys = foreignKeys.filter(
      (key) => key !== null && key !== undefined,
    );

    if (nonNullKeys.length !== 1) {
      throw new Error(
        'Exactly one of user_id, portfolio_id, or service_id must be non-null.',
      );
    }
  }
}
