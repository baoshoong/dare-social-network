import { Component, OnInit } from '@angular/core';
import { SEARCH_ROUTES } from './search.routes';
import { PostComponent } from '../../../shared/components/post/post.component';

// @ts-ignore
import * as PostActions from '../../../ngrx/post/post.action';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ShareModule } from '../../../shared/share.module';
import { MaterialModule } from '../../../shared/material.module';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SearchState } from '../../../ngrx/search/search.state';
import { debounceTime, Subscription } from 'rxjs';
import * as SearchActions from '../../../ngrx/search/search.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    PostComponent,
    MaterialModule,
    PostComponent,
    AsyncPipe,
    NgForOf,
    ShareModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchControl = new FormControl();

  searchResults: any;

  subscription: Subscription[] = [];

  searchResults$ = this.store.select('search', 'searchResult');

  constructor(
    private store: Store<{
      search: SearchState;
    }>,
  ) {}

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
        }),
    );
  }

  // selectedPost?: PostModel;
  //
  // onPostSelected(post?: PostModel) {
  //   this.selectedPost = post;
  // }
  //
  // trackByFn(index: number, item: PostModel): number {
  //   return item.id; // Assuming each post has a unique 'id' property
  // }
  protected readonly SEARCH_ROUTES = SEARCH_ROUTES;
}
