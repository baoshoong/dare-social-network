import {createReducer, on} from "@ngrx/store";
import * as LikeActions from "./like.actions";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";
import {LikeModel} from "../../model/like.model";

export const initialState = {
  likes: [],

  isCreateLike: false,
  createLikeSuccess: false,
  createLikeErrorMessage: <HttpErrorResponseModel>{},

  isGetLikes: false,
  isGetLikesSuccess: false,
  getLikesErrorMessage: <HttpErrorResponseModel>{},
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
      getLikesSuccess: false,
    };
  }),



  on(LikeActions.getLikesFailure, (state, { getLikesErrorMessage }) => {
    console.log(getLikesErrorMessage);
    return {
      ...state,
      getLikesErrorMessage: getLikesErrorMessage,
    };
  }),
)
