import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('delete/:id')
  softRemove(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.usersService.softRemove(+id);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return this.usersService.remove(+id);
  }
}
