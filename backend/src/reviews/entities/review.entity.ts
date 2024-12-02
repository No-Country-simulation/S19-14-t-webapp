import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Service } from 'src/services/entities/service.entity'; // Importa el modelo adecuado
import { User } from 'src/users/entities/user.entity'; // Importa el modelo adecuado

@Table
export class Review extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  comment: string;

  @BelongsTo(() => Service)
  service: Service;

  @BelongsTo(() => User)
  user: User;
}
