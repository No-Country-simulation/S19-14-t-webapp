import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Ventas',
    description: 'The category of the service',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
