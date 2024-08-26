import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
@Unique([ 'id', 'uid'])
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
  @ManyToOne(() => Profile, )
  @Column({ type: 'text' })
  uid: string;

  @ManyToOne(() => Post)
  @Column({ type: 'bigint' })
  postId: number;


}
