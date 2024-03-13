import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({
    example: '1',
    description: 'Уникальный идентификатор пользователя',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  userId: number;

  @ApiProperty({
    example: 'Причина бана',
    description: 'Причина бана пользователя',
  })
  @IsString({ message: 'Должно быть строкой' })
  banReason: string;
}
