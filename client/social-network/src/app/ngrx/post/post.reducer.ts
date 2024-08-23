import { PostState } from './post.state';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { PostModel, PostResponse } from '../../model/post.model';
import { createReducer, on } from '@ngrx/store';
import * as postActions from './post.actions';
import {PostDataModel} from "../../model/post-data.model";

export const initialState: PostState = {
  posts: <PostResponse>{},
  postDetail: <PostModel>{},
  minePosts: <PostResponse>{},

  isCreating: false,
  isCreateSuccess: false,
  createErrorMessage: <HttpErrorResponseModel>{},

  isUpdating: false,
  isUpdateSuccess: false,
  updateErrorMessage: <HttpErrorResponseModel>{},

  isGettingMinePost: false,
  isGetMinePostSuccess: false,
  isGetMinePostFailure: false,
  getErrorMessage: <HttpErrorResponseModel>{},

  isGettingPostDetail: false,
  isGetPostDetailSuccess: false,
  getErrorMessageById: <HttpErrorResponseModel>{},

  isGettingAllPosts: false,
  isGetAllPostsSuccess: false,
  isGetAllPostsFailure: false,
};

export const postReducer = createReducer(
  initialState,

  // createPost
  on(postActions.createPost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
    };
  }),

  on(postActions.createPostSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
    };
  }),

  on(postActions.createPostFailure, (state, { createPostErrorMessage }) => {
    console.log(createPostErrorMessage);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      createErrorMessage: createPostErrorMessage,
    };
  }),

  // updatePost

  on(postActions.updatePost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: true,
    };
  }),

  on(postActions.updatePostSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: true,
    };
  }),

  on(postActions.updatePostFailure, (state, { updatePostErrorMessage }) => {
    console.log(updatePostErrorMessage);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: false,
      updateErrorMessage: updatePostErrorMessage,
    };
  }),

  // getPostById

  on(postActions.getPostById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingPostDetail: true,
    };
  }),

  on(postActions.getPostByIdSuccess, (state, { post }) => {
    console.log(post);
    return {
      ...state,
      isGettingPostDetail: false,
      isGetPostDetailSuccess: true,
      postDetail: post,
    };
  }),

  on(postActions.getPostByIdFailure, (state, { getPostByIdErrorMessage }) => {
    console.log(getPostByIdErrorMessage);
    return {
      ...state,
      isGettingPostDetail: false,
      isGetPostDetailSuccess: false,
      getErrorMessageById: getPostByIdErrorMessage,
    };
  }),

  // getAllPost

  on(postActions.getAllPost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingAllPosts: true,
    };
  }),

  on(postActions.getAllPostSuccess, (state, { posts }) => {
    console.log(posts);
    return {
      ...state,
      isGettingAllPosts: false,
      isGetAllPostsSuccess: true,
      posts: posts,
    };
  }),

  on(postActions.getAllPostFailure, (state, { getAllPostErrorMessage }) => {
    console.log(getAllPostErrorMessage);
    return {
      ...state,
      isGettingAllPosts: false,
      isGetAllPostsSuccess: false,
      isGetAllPostsFailure: true,
    };
  }),

  // getMinePost

  on(postActions.getMinePost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isGettingMinePost: true,
    };
  }),

  on(postActions.getMinePostSuccess, (state, { minePosts, type }) => {
    console.log(minePosts);
    console.log(type);
    return {
      ...state,
      isGettingMinePost: false,
      isGetMinePostSuccess: true,
      minePosts: minePosts,
    };
  }),

  on(postActions.getMinePostFailure, (state, { getMinePostErrorMessage }) => {
    console.log(getMinePostErrorMessage);
    return {
      ...state,
      isGettingMinePost: false,
      isGetMinePostSuccess: false,
      isGetMinePostFailure: true,
      getErrorMessage: getMinePostErrorMessage,
    };
  }),

  on(postActions.clearMinePost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      minePosts: <PostResponse>{},
    };
  }),

  on(postActions.clearGetPost, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      posts: <PostResponse>{},
    };
  }),
);
