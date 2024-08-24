import { createReducer, on } from '@ngrx/store';
import * as CommentActions from './comment.actions';
import {CommentState} from "./comment.state";
import {CommentModel} from "../../model/comment.model";
import {HttpErrorResponseModel} from "../../model/http-error-response.model";

export const initialState: CommentState = {
  comments: <CommentModel>{},
  createCommentSuccess: false,
  createCommentErrorMessage: <HttpErrorResponseModel>{},
};

export const CommentReducer = createReducer(
  initialState,

  // createComment
  on(CommentActions.createComment, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      createCommentSuccess: false,
    };
  }),

  on(CommentActions.createCommentSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      createCommentSuccess: true,
    };
  }),

  on(CommentActions.createCommentFailure, (state, { createCommentErrorMessage }) => {
    console.log(createCommentErrorMessage);
    return {
      ...state,
      createCommentFailure: createCommentErrorMessage,
    };
  }),
);
