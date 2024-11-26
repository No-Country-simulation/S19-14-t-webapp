import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    example: 'My service',
    description: 'The title of the service',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This is my work',
    description: 'The summary of the service',
  })
  @IsOptional()
  @IsString()
  summary: string;

  @ApiProperty({
    example: 'This is my work',
    description: 'The description of the service',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 100,
    description: 'The price of the service',
  })
  @IsOptional()
  price: number;
}
