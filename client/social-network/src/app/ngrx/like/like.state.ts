import {LikeModel} from "../../model/like.model";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";

export interface LikeState {
  likes: LikeModel;
  createLikeSuccess: boolean;
  createLikeErrorMessage: HttpErrorResponseModel;
}
