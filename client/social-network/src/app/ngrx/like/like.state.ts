import { LikeModel } from '../../model/like.model';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';

export interface LikeState {
  likes: LikeModel[];
  count: number;

  isCreateLike: boolean;
  createLikeSuccess: boolean;
  createLikeErrorMessage: HttpErrorResponseModel;

  isGetLikes: boolean;
  isGetLikesSuccess: boolean;
  getLikesErrorMessage: HttpErrorResponseModel;

  isDeleteLike: boolean;
  deleteLikeSuccess: boolean;
  deleteLikeErrorMessage: HttpErrorResponseModel;
}
