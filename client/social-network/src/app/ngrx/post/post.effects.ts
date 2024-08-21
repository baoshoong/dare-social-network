import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostService } from '../../service/post/post.service';
import * as postActions from './post.actions';
import { exhaustMap, of, switchMap } from 'rxjs';
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

  getAllPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.getAllPost),
      switchMap((action) => {
        return this.postService
          .getAllPost(action.pageNumber, action.limitNumber)
          .pipe(
            map((posts) => {
              return postActions.getAllPostSuccess({ posts });
            }),
            catchError((error: HttpErrorResponseModel) => {
              return of(
                postActions.getAllPostFailure({
                  getAllPostErrorMessage: error,
                }),
              );
            }),
          );
      }),
    );
  });

  getMinePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.getMinePost),
      switchMap((action) => {
        return this.postService
          .getMinePost(action.uid, action.pageNumber, action.limitNumber)
          .pipe(
            map((posts) => {
              return postActions.getMinePostSuccess({ minePosts: posts });
            }),
            catchError((error: HttpErrorResponseModel) => {
              return of(
                postActions.getMinePostFailure({
                  getMinePostErrorMessage: error,
                }),
              );
            }),
          );
      }),
    );
  });

  getPostById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(postActions.getPostById),
      switchMap((action) => {
        return this.postService.getPostById(action.id).pipe(
          map((post) => {
            return postActions.getPostByIdSuccess({ post });
          }),
          catchError((error: HttpErrorResponseModel) => {
            return of(
              postActions.getPostByIdFailure({
                getPostByIdErrorMessage: error,
              }),
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
