import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John', description: "The user's first name" })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  name: string;

  @ApiProperty({ example: 'Doe', description: "The user's last name" })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  lastName: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: "The user's profile image URL",
  })
  @IsOptional()
  @IsNumber()
  image_id: number;

  @ApiProperty({
    example: '1 (occupation id)',
    description: "The user's occupation id",
  })
  @IsOptional()
  @IsNumber()
  occupation_id: number;

  @ApiProperty({
    example: 'Experienced software developer...',
    description: 'A brief summary about the user',
  })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  summary: string;

  @ApiProperty({
    example: 'https://linkedin.com/in/johndoe',
    description: "The user's LinkedIn profile URL",
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  linkedin: string;

  @ApiProperty({
    example: '@johndoe',
    description: "The user's social media handle",
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  social_media: string;
}
