import { createAction, props } from "@ngrx/store";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";
import {CommentModel} from "../../model/comment.model";

export const createComment = createAction( '[Comment] Create Comment', props<{ content: string, postId: bigint, uid: string }>());
export const isCreateComment = createAction( '[Comment] Is Create Comment');
export const createCommentSuccess = createAction( '[Comment] Create Comment Success');
export const createCommentFailure = createAction( '[Comment] Create Comment Failure', props<{ createCommentErrorMessage: HttpErrorResponseModel }>());

export const isGetComments = createAction( '[Comment] Is Get Comments'
  , props<{ postId: bigint }>());
export const getCommentsSuccess = createAction( '[Comment] Get Comments Success',
  props<{ comments: CommentModel[] }>());
export const getCommentsFailure = createAction( '[Comment] Get Comments Failure',
  props<{ getCommentsErrorMessage: HttpErrorResponseModel }>());
