import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID of the user creating the review',
    example: 1,
  })
  @IsInt()
  user_id: number;

  @ApiProperty({ description: 'Rating given by the user', example: 5 })
  @IsInt()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Comment provided by the user',
    example: 'Great service!',
  })
  @IsString()
  @MaxLength(200)
  comment: string;
}
