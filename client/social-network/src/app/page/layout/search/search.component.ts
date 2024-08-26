import {Component, OnDestroy, OnInit} from '@angular/core';
import { SEARCH_ROUTES } from './search.routes';
import { PostComponent } from '../../../shared/components/post/post.component';
import { SearchService } from '../../../service/search/search.service';
import {AsyncPipe, NgFor, NgForOf, NgIf} from '@angular/common';
import { ShareModule } from '../../../shared/share.module';
import { MaterialModule } from '../../../shared/material.module';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchState } from '../../../ngrx/search/search.state';
import { debounceTime, Subscription } from 'rxjs';
import * as SearchActions from '../../../ngrx/search/search.actions';
import {PostModel} from "../../../model/post.model";
import * as postActions from "../../../ngrx/post/post.actions";
import {PostState} from "../../../ngrx/post/post.state";
import {ProfileState} from "../../../ngrx/profile/profile.state";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {Router, RouterLink} from "@angular/router";
//import {importType} from "@angular/compiler";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    PostComponent,
    MaterialModule,
    PostComponent,
    AsyncPipe,
    NgForOf,
    NgFor,
    NgIf,
    RouterLink,
    ShareModule,
    InfiniteScrollDirective,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  items: PostModel[] = [];
  posts: PostModel[] = [];
  searchControl = new FormControl();

  searchResults: any;

  //subscription: Subscription[] = [];

  searchResults$ = this.store.select('search', 'searchResult');

  isLoading= true;
  isSearching$ = this.store.select('search', 'isSearching');


  constructor(
    private router: Router,
    private store: Store<{
      search: SearchState;
      post: PostState;
      profile: ProfileState;
    }>,private searchService: SearchService,
  ) {

  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(postActions.clearGetPost());
  }

  selector: string = '.scroll-container';
  // currentPage = 1;
  // size = 30;
  // itemsCount = 0;
  subscription: Subscription[] = [];
  getAllPost$ = this.store.select('post', 'posts');
  tempArray: PostModel[] = [];

  ngOnInit(): void {
    this.subscription.push(
      this.searchResults$.subscribe((searchResults) => {
        this.searchResults = searchResults;
        console.log('searchResults', searchResults);

      }),


      this.searchControl.valueChanges
        .pipe(debounceTime(1000))
        .subscribe((query) => {
          this.store.dispatch(SearchActions.search({ query }));
          this.search();
        }),

    );
  }

  search(){
    if(this.searchQuery.trim()==='value'){
      this.posts = this.items;
    }
    else{
      this.searchService.search(this.searchQuery).subscribe(results => {
        this.posts= results.posts;
      });
    }
  }


  // onScrollDown(ev: any) {
  //   console.log('scrolled down!!', ev);
  //   this.currentPage += 1;
  //   console.log(this.currentPage);
  //
  //   if (this.currentPage <= this.itemsCount) {
  //     console.log('get more post');
  //     this.store.dispatch(
  //       postActions.getAllPost({
  //         pageNumber: this.currentPage,
  //         limitNumber: this.size,
  //       }),
  //     );
  //   }
  // }
  protected readonly SEARCH_ROUTES = SEARCH_ROUTES;
}
