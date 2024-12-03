import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginRequest {
  @ApiProperty({ example: 'john@gmail.com', description: 'The user email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: "The user's password.",
    example: 'P@ssw0rd!',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthLoginReponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export class AuthLoginReponseWithToken extends AuthLoginReponse {
  token: string;
}
