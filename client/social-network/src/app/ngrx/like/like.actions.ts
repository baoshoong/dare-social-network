import { createAction, props } from '@ngrx/store';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import {LikeModel} from "../../model/like.model";


export const createLike = createAction(
  '[Create Like] Create Like',
  props<{ postId: LikeModel }>()
);
export const createLikeSuccess = createAction( '[Create Like] Create Like Success');
export const createLikeFailure = createAction(
  '[Create Like] Create Like Failure',
  props<{ createLikeErrorMessage: HttpErrorResponseModel}>()
);
