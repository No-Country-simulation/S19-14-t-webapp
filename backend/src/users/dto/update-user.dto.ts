import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

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
  @IsString()
  @Length(1, 2000)
  image: string;

  @ApiProperty({
    example: 'Software Developer',
    description: "The user's occupation",
  })
  @IsOptional()
  @IsString()
  @Length(1, 50)
  occupation: string;

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
