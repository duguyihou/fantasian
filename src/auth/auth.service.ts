import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  async login(user: any) {
    const { username, _id: id } = user;
    const payload = { username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
      msg: 'login success',
    };
  }

  getCookieWithJwtToken(user: any) {
    const { username, _id: id } = user;
    const payload = { username, sub: id };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get<string>(
      'jwt_expiresIn',
    )}`;
  }
}
