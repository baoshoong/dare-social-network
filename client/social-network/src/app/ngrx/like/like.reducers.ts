import {createReducer, on} from "@ngrx/store";
import * as LikeActions from "./like.actions";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";
import {LikeModel} from "../../model/like.model";

export const initialState = {
  likes: [],
  createLikeSuccess: false,
  createLikeErrorMessage: <HttpErrorResponseModel>{},

  removeLikes: [],
  removeLikeSuccess: false,
  removeLikeErrorMessage: <HttpErrorResponseModel>{},
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

)
