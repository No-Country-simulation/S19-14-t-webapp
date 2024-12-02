import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Service } from 'src/services/entities/service.entity';

@Table
export class Category extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => Service)
  services: Service[];
}
