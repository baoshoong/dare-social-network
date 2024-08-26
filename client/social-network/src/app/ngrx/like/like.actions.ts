import { createAction, props } from '@ngrx/store';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import {LikeModel} from "../../model/like.model";


export const createLike = createAction(
  '[Create Like] Create Like',
  props<{ like: LikeModel }>()
);
export const isCreateLike = createAction('[Create Like] Is Create Like');
export const createLikeSuccess = createAction( '[Create Like] Create Like Success');
export const createLikeFailure = createAction(
  '[Create Like] Create Like Failure',
  props<{ createLikeErrorMessage: HttpErrorResponseModel}>()
);

export const getLikes = createAction(
  '[Get Likes] Get Likes',
  props<{ postId: string }>()
);
export const getLikesSuccess = createAction(
  '[Get Likes] Get Likes Success',
  props<{ likes: LikeModel[] }>()
);
export const getLikesFailure = createAction(
  '[Get Likes] Get Likes Failure',
  props<{ getLikesErrorMessage: HttpErrorResponseModel }>()
);
