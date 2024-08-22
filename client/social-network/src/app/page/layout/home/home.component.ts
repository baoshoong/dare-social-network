import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { PostComponent } from '../../../shared/components/post/post.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { PostState } from '../../../ngrx/post/post.state';
import * as postActions from '../../../ngrx/post/post.actions';
import { Subscription } from 'rxjs';
import { PostModel, PostResponse } from '../../../model/post.model';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import * as profileActions from '../../../ngrx/profile/profile.actions';
import { ProfileModel } from '../../../model/profile.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    PostComponent,
    RouterOutlet,
    NgFor,
    NgIf,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<{
      post: PostState;
      profile: ProfileState;
    }>,
  ) {
    this.store.dispatch(
      postActions.getAllPost({ pageNumber: 1, limitNumber: 10 }),
    );
  }

  subscription: Subscription[] = [];
  getAllPost$ = this.store.select('post', 'posts');
  getProfile$ = this.store.select('profile', 'mine');

  posts: PostResponse = { data: [], count: 0, pageNumber: 1, limitNumber: 10 };
  profile: ProfileModel | null = null;

  ngOnInit(): void {
    this.subscription.push(
      this.getAllPost$.subscribe((posts) => {
        if (posts) {
          this.posts = posts;
        }
      }),
    );

    this.subscription.push(
      this.getProfile$.subscribe((profile) => {
        if (profile) {
          this.profile = profile;
        }
      }),
    );
  }

  navigateToDetail(post: PostModel) {
    this.store.dispatch(profileActions.getById({ uid: post.uid }));
    this.subscription.push(
      this.getProfile$.subscribe((profile) => {
        const profileDetail = profile && profile.uid === post.uid ? profile : null;
        this.router
          .navigate(['/detail-post', post.id], { state: { post, profile: profileDetail } })
          .then((r) => console.log(r));
      })
    );
  }
}
