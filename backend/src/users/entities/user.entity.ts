import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.BIGINT,
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

  @Column({
    type: DataType.STRING(2000),
    allowNull: true,
  })
  image: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  occupation: string;

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
    allowNull: false,
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
}
