import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '@entities/Role.entity';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([RoleEntity]), // Регистрируйте RoleEntity в TypeOrmModule
  ],
  exports: [RoleService],
})
export class RoleModule {}
