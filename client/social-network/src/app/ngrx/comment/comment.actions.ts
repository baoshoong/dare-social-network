import { createAction, props } from "@ngrx/store";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";
import {CommentModel} from "../../model/comment.model";

export const createComment = createAction( '[Comment] Create Comment', props<{ comment: CommentModel }>());
export const createCommentSuccess = createAction( '[Comment] Create Comment Success');
export const createCommentFailure = createAction( '[Comment] Create Comment Failure', props<{ createCommentErrorMessage: HttpErrorResponseModel }>());
