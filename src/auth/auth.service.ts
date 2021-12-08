import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { LocalStrategy } from './local/local.strategy';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private localStrategy: LocalStrategy,
  ) {}

  async signup(payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  async login(payload: LoginDto) {
    const { username, password } = payload;
    return this.localStrategy.validate(username, password);
  }
}
