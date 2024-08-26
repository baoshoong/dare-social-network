import { createReducer, on } from '@ngrx/store';
import * as LikeActions from './like.actions';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { LikeState } from './like.state';

export const initialState: LikeState = {
  likes: [],
  count: 0,

  isCreateLike: false,
  createLikeSuccess: false,
  createLikeErrorMessage: <HttpErrorResponseModel>{},

  isGetLikes: false,
  isGetLikesSuccess: false,
  getLikesErrorMessage: <HttpErrorResponseModel>{},

  isDeleteLike: false,
  deleteLikeSuccess: false,
  deleteLikeErrorMessage: <HttpErrorResponseModel>{},
};
export const LikeReducer = createReducer(
  initialState,
  on(LikeActions.createLike, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      createLikeSuccess: false,
    };
  }),
  on(LikeActions.createLikeSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      createLikeSuccess: true,
    };
  }),
  on(LikeActions.createLikeFailure, (state, { createLikeErrorMessage }) => {
    console.log(createLikeErrorMessage);
    return {
      ...state,
      createLikeFailure: createLikeErrorMessage,
    };
  }),

  on(LikeActions.getLikes, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGetLikesSuccess: false,
    };
  }),

  on(LikeActions.getLikesSuccess, (state, { likes, type }) => {
    console.log(likes);
    console.log(type);
    return {
      ...state,
      likes: likes,
      isGetLikesSuccess: true,
    };
  }),

  on(LikeActions.getLikesFailure, (state, { getLikesErrorMessage }) => {
    console.log(getLikesErrorMessage);
    return {
      ...state,
      getLikesErrorMessage: getLikesErrorMessage,
    };
  }),

  on(LikeActions.deleteLike, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isDeleteLike: true,
      deleteLikeSuccess: false,
    };
  }),

  on(LikeActions.deleteLikeSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      deleteLikeSuccess: true,
    };
  }),

  on(LikeActions.deleteLikeFailure, (state, { deleteLikeErrorMessage }) => {
    console.log(deleteLikeErrorMessage);
    return {
      ...state,
      deleteLikeErrorMessage: deleteLikeErrorMessage,
    };
  }),

  on(LikeActions.getLikeCount, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      count: 0,
    };
  }),

  on(LikeActions.getLikeCountSuccess, (state, { count, type }) => {
    console.log(count);
    console.log(type);
    return {
      ...state,
      count: count,
    };
  }),

  on(LikeActions.getLikeCountFailure, (state, { getLikeCountErrorMessage }) => {
    console.log(getLikeCountErrorMessage);
    return {
      ...state,
      getLikeCountErrorMessage: getLikeCountErrorMessage,
    };
  }),

  on(LikeActions.clearLikeState, (state) => {
    return {
      likes: [],
      count: 0,

      isCreateLike: false,
      createLikeSuccess: false,
      createLikeErrorMessage: <HttpErrorResponseModel>{},

      isGetLikes: false,
      isGetLikesSuccess: false,
      getLikesErrorMessage: <HttpErrorResponseModel>{},

      isDeleteLike: false,
      deleteLikeSuccess: false,
      deleteLikeErrorMessage: <HttpErrorResponseModel>{},
    };
  }),
);
