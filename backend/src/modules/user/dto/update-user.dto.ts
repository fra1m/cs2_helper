import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'user@user.ru',
    description: 'Почта пользователя',
  })
  email: string;
}
