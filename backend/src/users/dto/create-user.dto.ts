import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsEnum,
  IsBoolean,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
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
    example: 'john.doe@example.com',
    description: "The user's email",
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Length(1, 100)
  email: string;

  @ApiProperty({
    description:
      "The user's password. It must have between 8 and 20 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
    example: 'P@ssw0rd!',
    minLength: 8,
    maxLength: 20,
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 20, {
    message: 'The password must have between 8 and 20 characters',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'The password must have at least one uppercase letter',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'The password must have at least one lowercase letter',
  })
  @Matches(/(?=.*\d)/, {
    message: 'The password must have at least one number',
  })
  @Matches(/(?=.*[@$!%*?&#-_/|])/, {
    message:
      'The password must have at least one special character (for example, @, $, !, %, *, ?, &, #, -, _, /, |,)',
  })
  password: string;

  @ApiProperty({
    example: 'CLIENT',
    description:
      "The user's role, which can be 'ADMIN', 'CLIENT', or 'SERVICE'",
  })
  @IsEnum(['ADMIN', 'CLIENT', 'SERVICE'], {
    message: 'The role must be either ADMIN, CLIENT, or SERVICE',
  })
  role: string;

  @ApiProperty({
    example: '1',
    description: "The user's image id",
  })
  @IsOptional()
  @IsNumber()
  image_id: number;

  @ApiProperty({
    example: '1',
    description: "The user's occupation id",
  })
  @IsOptional()
  @IsNumber()
  occupation_id: number;

  @ApiProperty({
    example: true,
    description: "The user's active status",
  })
  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    example: 'Experienced software developer...',
    description: 'A brief summary about the user',
  })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  summary: string;

  @ApiProperty({
    example: '1123456789',
    description: "The user's phone number",
  })
  @IsOptional()
  @IsString()
  @Length(1, 45)
  phone: string;

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

  @ApiProperty({
    example: '2023-10-01T12:34:56Z',
    description: "The user's last seen date",
  })
  @IsOptional()
  @IsDateString()
  last_seen: Date;

  @ApiProperty({
    example: 'Capital Federal, Buenos Aires',
    description: "The user's location",
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  location: string;
}
