import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: "The user's new password",
    example: 'P@ssw0rd!',
    minLength: 8,
    maxLength: 20,
  })
  @IsString()
  password: string;
}
