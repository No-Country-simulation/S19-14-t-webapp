import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HashAdapter } from 'src/common/adapters/hash.adapter';
import { JwtService } from '@nestjs/jwt';
import {
  AuthLoginReponse,
  AuthLoginReponseWithToken,
  AuthLoginRequest,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticateUser(
    input: AuthLoginRequest,
  ): Promise<AuthLoginReponseWithToken> {
    const user = await this.validateUser(input);

    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    return this.signIn(user);
  }

  async validateUser(
    input: AuthLoginRequest,
  ): Promise<AuthLoginReponse | null> {
    const user = await this.usersService.findByEmail(input.email);

    if (!user) throw new NotFoundException('Usuario no encontrado');

    const hashAdapter = new HashAdapter();
    const isValidPassword = hashAdapter.verifyHash(
      input.password,
      user.password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException('Contraseña incorrecta');

    if (user && isValidPassword) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    }
    return null;
  }

  async signIn(user: AuthLoginReponse): Promise<AuthLoginReponseWithToken> {
    const tokenPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      name: user.name,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      ...user,
      token: accessToken,
    };
  }
}
