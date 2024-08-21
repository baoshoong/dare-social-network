import { createAction, props } from '@ngrx/store';
import { PostModel } from '../../model/post.model';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';

export const createPost = createAction(
  '[Post] Create Post',
  props<{ post: PostModel }>(),
);

export const createPostSuccess = createAction('[Post] Create Post Success');

export const createPostFailure = createAction(
  '[Post] Create Post Failure',
  props<{ createPostErrorMessage: HttpErrorResponseModel }>(),
);

//update post

export const updatePost = createAction(
  '[Post] Update Post',
  props<{ post: PostModel }>(),
);

export const updatePostSuccess = createAction('[Post] Update Post Success');

export const updatePostFailure = createAction(
  '[Post] Update Post Failure',
  props<{ updatePostErrorMessage: HttpErrorResponseModel }>(),
);

//get post by id

export const getPostById = createAction(
  '[Post] Get Post By Id',
  props<{ id: BigInt }>(),
);

export const getPostByIdSuccess = createAction(
  '[Post] Get Post By Id Success',
  props<{ post: PostModel }>(),
);

export const getPostByIdFailure = createAction(
  '[Post] Get Post By Id Failure',
  props<{ getPostByIdErrorMessage: HttpErrorResponseModel }>(),
);

//get all post

export const getAllPost = createAction('[Post] Get All Post', props<{ page: number, limit: number }>());

export const getAllPostSuccess = createAction(
  '[Post] Get All Post Success',
  props<{ posts: PostModel[] }>(),
);

export const getAllPostFailure = createAction(
  '[Post] Get All Post Failure',
  props<{ getAllPostErrorMessage: HttpErrorResponseModel }>(),
);

//getMinePost

export const getMinePost = createAction(
  '[Post] Get Mine Post',
  props<{ uid: string }>(),
);

export const getMinePostSuccess = createAction(
  '[Post] Get Mine Post Success',
  props<{ minePosts: PostModel[] }>(),
);

export const getMinePostFailure = createAction(
  '[Post] Get Mine Post Failure',
  props<{ getMinePostErrorMessage: HttpErrorResponseModel }>(),
);
