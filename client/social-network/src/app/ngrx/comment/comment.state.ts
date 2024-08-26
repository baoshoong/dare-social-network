import {CommentModel} from "../../model/comment.model";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";

export interface CommentState {
  comments: CommentModel[];


  isCreateComment: boolean;
  createCommentSuccess: boolean;
  createCommentErrorMessage: HttpErrorResponseModel;

  isGetComments: boolean;
  getCommentsSuccess: boolean;
  getCommentsErrorMessage: HttpErrorResponseModel;
}


