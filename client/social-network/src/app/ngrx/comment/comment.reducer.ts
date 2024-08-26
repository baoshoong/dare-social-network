import { createReducer, on } from '@ngrx/store';
import * as CommentActions from './comment.actions';
import { CommentState } from './comment.state';
import { CommentModel } from '../../model/comment.model';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';

export const initialState: CommentState = {
  comments: [],

  isCreateComment: false,
  createCommentSuccess: false,
  createCommentErrorMessage: <HttpErrorResponseModel>{},

  isGetComments: false,
  getCommentsSuccess: false,
  getCommentsErrorMessage: <HttpErrorResponseModel>{},
};

export const CommentReducer = createReducer(
  initialState,

  // createComment
  on(CommentActions.createComment, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      createCommentSuccess: false,
      isCreateComment: true,
    };
  }),

  on(CommentActions.createCommentSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      createCommentSuccess: true,
      isCreateComment: false,
    };
  }),

  on(
    CommentActions.createCommentFailure,
    (state, { createCommentErrorMessage }) => {
      console.log(createCommentErrorMessage);
      return {
        ...state,
        createCommentFailure: createCommentErrorMessage,
        isCreateComment: false,
      };
    },
  ),

  // getComments
  on(CommentActions.GetComments, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      getCommentsSuccess: false,
      isGetComments: true,
    };
  }),

  on(CommentActions.getCommentsSuccess, (state, { comments, type }) => {
    console.log(comments);
    console.log(type);
    return <CommentState>{
      ...state,
      comments: comments,
      getCommentsSuccess: true,
      isGetComments: false,
    };
  }),

  on(
    CommentActions.getCommentsFailure,
    (state, { getCommentsErrorMessage }) => {
      console.log(getCommentsErrorMessage);
      return {
        ...state,
        getCommentsErrorMessage: getCommentsErrorMessage,
        isGetComments: false,
      };
    },
  ),

  on(CommentActions.clearCommentState, (state) => {
    return {
      ...state,
      comments: [],
      isCreateComment: false,
      createCommentSuccess: false,
      createCommentErrorMessage: <HttpErrorResponseModel>{},
      isGetComments: false,
      getCommentsSuccess: false,
      getCommentsErrorMessage: <HttpErrorResponseModel>{},
    };
  }),
);
