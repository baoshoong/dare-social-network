import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'bigint' })
  postId: number;

  @Column({ type: 'text' })
  uid: string;
}
