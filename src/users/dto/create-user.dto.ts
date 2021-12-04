import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'username',
  })
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
