import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class AuthLoginRequest {
  @ApiProperty({ example: 'john@gmail.com', description: 'The user email' })
  @IsEmail()
  readonly email: string;

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
  @Matches(/(?=.*[@$!%*?&#])/, {
    message:
      'The password must have at least one special character (for example, @, $, !, %, *, ?, &, #)',
  })
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
