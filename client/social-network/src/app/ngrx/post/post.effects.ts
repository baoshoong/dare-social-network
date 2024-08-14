import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../service/post/post.service';
import * as postActions from './post.actions';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostModel } from '../../model/post.model';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';

@Injectable()
export class PostEffects {
  createPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.createPost),
      switchMap((action) => {
        return this.postService.createPost(action.post).pipe(
          map(() => {
            return postActions.createPostSuccess();
          }),
          catchError((error: HttpErrorResponseModel) => {
            return of(
              postActions.createPostFailure({ createPostErrorMessage: error }),
            );
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private postService: PostService,
  ) {}
}
