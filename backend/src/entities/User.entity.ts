import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from './Role.entity';
import { PostEntity } from './Post.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@user.ru', description: 'Почта пользователя' })
  @Column({ unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: 'pass123', description: 'Пароль пользователя' })
  @Column({ nullable: false })
  password: string;

  @ApiProperty({
    example: 'true',
    description: 'Булевое значение бана пользователя',
  })
  @Column({ default: false })
  banned: boolean;

  @ApiProperty({
    example: 'Причина бана',
    description: 'Причина бана пользователя',
  })
  @Column({ nullable: true })
  banReason: string;

  @ManyToMany(() => RoleEntity, { cascade: true, eager: true })
  @JoinTable({ name: 'users_role' })
  role: RoleEntity[];

  @OneToMany(() => PostEntity, (post) => post.author, {
    cascade: true,
    eager: true,
  })
  posts: PostEntity[];
}
