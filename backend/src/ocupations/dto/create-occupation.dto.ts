import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOccupationDto {
  @ApiProperty({
    example: 'Carpintero',
    description: 'The name of the ocupation',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/image.svg',
    description: 'The icon of the ocupation',
  })
  @IsNotEmpty()
  @IsString()
  icon: string;
}
