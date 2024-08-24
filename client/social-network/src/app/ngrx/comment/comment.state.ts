import {CommentModel} from "../../model/comment.model";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";

export interface CommentState {
  comments: CommentModel;
  createCommentSuccess: boolean;
  createCommentErrorMessage: HttpErrorResponseModel;
}


