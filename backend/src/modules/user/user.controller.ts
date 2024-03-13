import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipes';
import { UserEntity } from '@entities/User.entity';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/roles.guard';
import { Roles } from '@modules/auth/roles-auth.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({
    summary: 'Получение всех пользователей (Только для администратора)',
  })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('/all')
  findAll() {
    return this.userService.findAllUsers();
  }

  @ApiOperation({ summary: 'Выдать роль (Только для администратора)' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/giverole')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.userService.addRole(addRoleDto);
  }

  @ApiOperation({
    summary: 'Забавить пользователя (Только для администратора)',
  })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/giveban')
  banUser(@Body() banUserDto: BanUserDto) {
    console.log(banUserDto);
    return this.userService.banUser(banUserDto);
  }

  @ApiOperation({ summary: 'Получение пользователя по ID' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Обновление пользователя по ID' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Удаление пользователя по ID' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
