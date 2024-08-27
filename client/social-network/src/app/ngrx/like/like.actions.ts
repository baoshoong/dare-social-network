import { createAction, props } from '@ngrx/store';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { LikeModel } from '../../model/like.model';

export const createLike = createAction(
  '[Create Like] Create Like',
  props<{ like: LikeModel }>(),
);
export const createLikeSuccess = createAction(
  '[Create Like] Create Like Success',
);
export const createLikeFailure = createAction(
  '[Create Like] Create Like Failure',
  props<{ createLikeErrorMessage: HttpErrorResponseModel }>(),
);

export const getLikes = createAction(
  '[Get Likes] Get Likes',
  props<{ postId: string }>(),
);
export const getLikesSuccess = createAction(
  '[Get Likes] Get Likes Success',
  props<{ likes: LikeModel[] }>(),
);
export const getLikesFailure = createAction(
  '[Get Likes] Get Likes Failure',
  props<{ getLikesErrorMessage: HttpErrorResponseModel }>(),
);

export const deleteLike = createAction(
  '[Delete Like] Delete Like',
  props<{ postId: string }>(),
);

export const deleteLikeSuccess = createAction(
  '[Delete Like] Delete Like Success',
);

export const deleteLikeFailure = createAction(
  '[Delete Like] Delete Like Failure',
  props<{ deleteLikeErrorMessage: HttpErrorResponseModel }>(),
);

export const clearLikeState = createAction(
  '[Clear Like State] Clear Like State',
);

export const getLikeCount = createAction(
  '[Get Like Count] Get Like Count',
  props<{ postId: string }>(),
);

export const getLikeCountSuccess = createAction(
  '[Get Like Count] Get Like Count Success',
  props<{ count: number }>(),
);

export const getLikeCountFailure = createAction(
  '[Get Like Count] Get Like Count Failure',
  props<{ getLikeCountErrorMessage: HttpErrorResponseModel }>(),
);
