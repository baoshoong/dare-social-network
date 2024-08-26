import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { IdToAvatarPipe } from '../../pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../pipes/id-to-name.pipe';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { ProfileModel } from '../../../model/profile.model';
import { Subscription } from 'rxjs';
import { PostModel } from '../../../model/post.model';
import { Router } from '@angular/router';
import * as ProfileActions from '../../../ngrx/profile/profile.actions';
import * as PostActions from '../../../ngrx/post/post.actions';
import { PostLoaderSkeletonComponent } from '../post-loader-skeleton/post-loader-skeleton.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MaterialModule,
    NgForOf,
    NgIf,
    IdToAvatarPipe,
    AsyncPipe,
    IdToNamePipe,
    PostLoaderSkeletonComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  constructor(
    private route: Router,
    private store: Store<{
      profile: ProfileState;
    }>,
  ) {}

  profiles = <ProfileModel>{};

  @Input() post: PostModel = <PostModel>{};
  @Output() imageClick = new EventEmitter<void>();

  onImageClick() {
    this.route.navigateByUrl(`/detail-post/${this.post.id}`).then();
    this.store.dispatch(PostActions.getPostById({ id: this.post.id }));
  }

  navigateToProfile() {
    this.route.navigateByUrl(`/profile/${this.post.uid}`).then();
    this.store.dispatch(PostActions.clearMinePost());
    this.store.dispatch(ProfileActions.getById({ uid: this.post.uid }));
  }

  postList = [
    {
      id: '1',
      uid: '1',
      content: 'content',
      createAt: Date.now(),
      images: 'https://via.placeholder.com/450',
    },
    {
      id: '2',
      uid: '2',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: '3',
      uid: '3',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: '4',
      uid: '4',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: '5',
      uid: '5',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: 6,
      uid: '6',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: '7',
      uid: '7',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: '8',
      uid: '8',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: '9',
      uid: '9',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
    {
      id: '10',
      uid: '10',
      content: 'content',
      createAt: Date.now(),
      images: ['https://via.placeholder.com/450'],
    },
  ];
}
