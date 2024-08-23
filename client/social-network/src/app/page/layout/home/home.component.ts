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

import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

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
    InfiniteScrollDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
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
      postActions.getAllPost({
        pageNumber: this.currentPage,
        limitNumber: this.size,
      }),
    );
  }
  selector: string = '.scroll-container';
  currentPage = 1;
  size = 10;
  itemsCount = 0;
  subscription: Subscription[] = [];
  getAllPost$ = this.store.select('post', 'posts');
  tempArray: PostModel[] = [];

  ngOnInit(): void {
    this.subscription.push(
      this.getAllPost$.subscribe((posts) => {
        if (posts) {
          this.tempArray = [...this.posts];
          this.posts = [...this.tempArray, ...posts.data];
          this.itemsCount = posts.limitNumber;
        }
      }),
    );
  }

  posts: PostModel[] = [];

  navigateToDetail(post: PostModel) {
    this.router
      .navigate(['/detail-post', post.id], { state: { post } })
      .then((r) => console.log(r));
    console.log(post);
  }

  onScrollDown(ev: any) {
    console.log('scrolled down!!', ev);
    this.currentPage += 1;
    console.log(this.currentPage);

    if (this.currentPage <= this.itemsCount) {
      console.log('get more post');
      this.store.dispatch(
        postActions.getAllPost({
          pageNumber: this.currentPage,
          limitNumber: this.size,
        }),
      );
    }
  }
}
