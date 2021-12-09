import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
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
}
