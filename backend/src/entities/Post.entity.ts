import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity({ name: 'posts' })
export class PostEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идификатор' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: ' ',
    description: 'Название поста',
  })
  @Column({ nullable: false })
  title: string;

  @ApiProperty({
    example: ' ',
    description: 'Контентная часть',
  })
  @Column({ nullable: false })
  content: string;

  @ApiProperty({
    example: ' ',
    description: 'Название изображений',
  })
  @Column({ nullable: false })
  image: string;

  @ApiProperty({
    example: '1',
    description: 'Уникальный идификатор автора',
  })
  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;
}
