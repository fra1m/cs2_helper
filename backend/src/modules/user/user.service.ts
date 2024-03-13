import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleService } from '../role/role.service';
import { UserEntity } from '@entities/User.entity';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private roleServie: RoleService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);
    const role = await this.roleServie.getRoleByValue('USER');
    user.role = [role];
    return await this.userRepository.save(user);
  }

  async findAllUsers() {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findOneBy({ id: addRoleDto.userId });
    const role = await this.roleServie.getRoleByValue(addRoleDto.value);
    if (user && role) {
      user.role = [role];
      await this.userRepository.save(user);
      return addRoleDto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.userRepository.findOneBy({ id: banUserDto.userId });
    if (user.banned) {
      throw new HttpException('Пользователь уже забанен', HttpStatus.FORBIDDEN);
    }
    if (user) {
      user.banned = true;
      user.banReason = banUserDto.banReason;
      await this.userRepository.save(user);
      return banUserDto;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
