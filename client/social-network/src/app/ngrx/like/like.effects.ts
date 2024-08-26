import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as likeActions from "./like.actions";
import {of, switchMap} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";
import {LikeService} from "../../service/like/like.service";

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
              likeActions.createLikeFailure({createLikeErrorMessage: error}),
            );
          }),
        );
      }),
    );
  });
  constructor(private actions$: Actions, private likeService: LikeService) {}
}
