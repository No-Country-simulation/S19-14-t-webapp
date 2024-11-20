import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HashAdapter } from 'src/common/adapters/hash.adapter';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const hashAdapter = new HashAdapter();
    const hashedPassword = hashAdapter.createHash(createUserDto.password, 10);

    const userData = {
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role || 'CLIENT',
      is_active: true,
    };
    return this.usersRepository.create(userData);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    const newUserData = {
      ...user.dataValues,
      ...updateUserDto,
    };
    await this.usersRepository.update(newUserData, { where: { id } });
    return 'El usuario de id ' + id + ' se actualizó correctamente';
  }

  softRemove(id: number) {
    const user = this.findOne(id);
    const newUserData = { ...user, isActive: false };
    return this.usersRepository.update(newUserData, { where: { id } });
  }

  remove(id: number) {
    this.usersRepository.destroy({ where: { id } });
    return 'El usuario de id ' + id + ' se eliminó correctamente';
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
