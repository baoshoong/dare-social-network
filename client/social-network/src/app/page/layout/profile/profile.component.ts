import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FollowingComponent } from './following/following.component';
import { FollowersComponent } from './followers/followers.component';
import { MaterialModule } from '../../../shared/material.module';
import { AsyncPipe, NgForOf } from '@angular/common';
import { PostComponent } from '../../../shared/components/post/post.component';
import { PostModel, PostResponse } from '../../../model/post.model';
import { Subscription } from 'rxjs';
import { PostState } from '../../../ngrx/post/post.state';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import * as PostAction from '../../../ngrx/post/post.actions';
import { ProfileModel } from '../../../model/profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, NgForOf, PostComponent, AsyncPipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  subscriptions: Subscription[] = [];

  profileMine$ = this.store.select('profile', 'mine');

  minePosts$ = this.store.select('post', 'minePosts');

  minePosts: PostResponse = <PostResponse>{};
  profileMine: ProfileModel = <ProfileModel>{};

  constructor(
    public dialog: MatDialog,
    public store: Store<{
      post: PostState;
      profile: ProfileState;
    }>,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.profileMine$.subscribe((profile) => {
        if (profile) {
          this.profileMine = profile;
          this.store.dispatch(
            PostAction.getMinePost({
              uid: this.profileMine.uid,
              pageNumber: 1,
              limitNumber: 5,
            }),
          );
        }
      }),

      this.minePosts$.subscribe((posts) => {
        console.log(posts);
        this.minePosts = posts;
      }),
    );
  }

  openDialog2() {
    this.dialog.open(FollowingComponent);
  }

  openDialog3() {
    this.dialog.open(FollowersComponent);
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: {
        avatarUrl: this.profileMine.avatarUrl,
        name: this.profileMine.userName,
        bio: this.profileMine.bio,
      },
    });
    dialogRef.componentInstance.avatarChanged.subscribe(
      (newAvatarUrl: string) => {
        this.profileMine.avatarUrl = newAvatarUrl;
        this.profileMine.userName =
          dialogRef.componentInstance.editProfileForm.value.name ?? '';
        this.profileMine.bio =
          dialogRef.componentInstance.editProfileForm.value.bio ?? '';
      },
    );
  }
  posts: PostModel[] = [];

  selectedPost?: PostModel;
}
