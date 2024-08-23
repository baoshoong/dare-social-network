import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from '../../profile/entities/profile.entity';
import { Post } from 'src/post/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;

  @Column({ type: 'text' })
  uid: string;

  @Column({ type: 'bigint' })
  postId: number;

  @ManyToOne(() => Profile, (profile) => profile.uid)
  @JoinColumn({ name: 'uid', referencedColumnName: 'uid' })
  @ManyToOne(() => Post, (post) => post, { nullable: false })
  @JoinColumn({ name: 'postId', referencedColumnName: 'id' })
  post: Post;
}
