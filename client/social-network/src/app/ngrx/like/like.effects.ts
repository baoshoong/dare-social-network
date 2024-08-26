import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as likeActions from './like.actions';
import { of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { LikeService } from '../../service/like/like.service';

@Injectable()
export class LikeEffects {
  createLike$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(likeActions.createLike),
      switchMap((action) => {
        return this.likeService.createLike(action.like).pipe(
          map(() => {
            return likeActions.createLikeSuccess();
          }),
          catchError((error: HttpErrorResponseModel) => {
            return of(
              likeActions.createLikeFailure({ createLikeErrorMessage: error }),
            );
          }),
        );
      }),
    );
  });

  getLikes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(likeActions.getLikes),
      switchMap((action) => {
        return this.likeService.getLikes(action.postId).pipe(
          map((likes) => {
            return likeActions.getLikesSuccess({ likes });
          }),
          catchError((error: HttpErrorResponseModel) => {
            return of(
              likeActions.getLikesFailure({ getLikesErrorMessage: error }),
            );
          }),
        );
      }),
    );
  });

  getLikeCount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(likeActions.getLikeCount),
      switchMap((action) => {
        return this.likeService.getLikeCount(action.postId).pipe(
          map((count) => {
            return likeActions.getLikeCountSuccess({ count });
          }),
          catchError((error: HttpErrorResponseModel) => {
            return of(
              likeActions.getLikeCountFailure({
                getLikeCountErrorMessage: error,
              }),
            );
          }),
        );
      }),
    );
  });

  deleteLike$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(likeActions.deleteLike),
      switchMap((action) => {
        return this.likeService.deleteLike(action.postId).pipe(
          map(() => {
            return likeActions.deleteLikeSuccess();
          }),
          catchError((error: HttpErrorResponseModel) => {
            return of(
              likeActions.deleteLikeFailure({ deleteLikeErrorMessage: error }),
            );
          }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private likeService: LikeService,
  ) {}
}
