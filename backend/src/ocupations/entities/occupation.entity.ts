import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';

@Table
export class Occupation extends Model {
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

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  icon: string;

  @HasMany(() => User)
  users: User[];
}
