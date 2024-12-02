import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    example: 'My portfolio',
    description: 'The title of the portfolio',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This is my work',
    description: 'The description of the portfolio',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2021-10-10',
    description: 'The date of the portfolio',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    example: '1',
    description: 'The image id of the portfolio',
  })
  @IsOptional()
  @IsNumber()
  image_id: number;
}