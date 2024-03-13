import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '../../entities/Role.entity';

@ApiTags('Roles')
@Controller('/roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Получение роли по значению' })
  @ApiResponse({ status: 200, type: RoleEntity })
  @Get('/:value')
  findAll(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
