import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe, NgIf } from '@angular/common';
import { PostModel } from '../../../model/post.model';
import { IdToAvatarPipe } from '../../pipes/id-to-avatar.pipe';

export interface CommentModel {
  userName: string;
  avatarUrl: string;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [MaterialModule, NgIf, AsyncPipe, IdToAvatarPipe],
  templateUrl: './detail-post.component.html',
  styleUrl: './detail-post.component.scss',
})
export class DetailPostComponent {
  @Input() post!: PostModel;
}
