import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Profile } from '../../profile/entities/profile.entity';

@Entity()
@Unique(['id', 'uid'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Post)
  @Column({ type: 'bigint' })
  postId: number;

  @ManyToOne(() => Profile, )
  @Column({ type: 'text' })
  uid: string;



}
