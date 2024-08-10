import { ProfileState } from './profile.state';
import { ProfileModel } from '../../model/profile.model';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from './profile.actions';
export const initialState: ProfileState = {
  mine: <ProfileModel>{},
  profile: <ProfileModel>{},
  profiles: [],

  isCreating: false,
  isCreateSuccess: false,
  createErrorMessage: <HttpErrorResponseModel>{},

  isUpdating: false,
  isUpdateSuccess: false,
  updateErrorMessage: <HttpErrorResponseModel>{},

  isGetting: false,
  isGetMineSuccess: false,
  getErrorMessage: <HttpErrorResponseModel>{},

  isGettingById: false,
  isGetByIdSuccess: false,
  getErrorMessageById: <HttpErrorResponseModel>{},
};
export const profileReducer = createReducer(
  initialState,

  // createMine
  on(ProfileActions.createMine, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
    };
  }),

  on(ProfileActions.createMineSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
    };
  }),

  on(ProfileActions.createMineFailure, (state, { createErrorMessage }) => {
    console.log(createErrorMessage);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      createErrorMessage,
    };
  }),

  // updateMine

  on(ProfileActions.updateMine, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: true,
    };
  }),

  on(ProfileActions.updateMineSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: true,
    };
  }),

  on(ProfileActions.updateMineFailure, (state, { updateErrorMessage }) => {
    console.log(updateErrorMessage);
    return {
      ...state,
      isUpdating: false,
      isUpdateSuccess: false,
      updateErrorMessage,
    };
  }),

  // getMine
  on(ProfileActions.getMine, (state) => {
    return {
      ...state,
      isGetting: true,
    };
  }),

  on(ProfileActions.getMineSuccess, (state, { mine }) => {
    return {
      ...state,
      isGetting: false,
      isGetMineSuccess: true,
      mine,
    };
  }),

  on(ProfileActions.getMineFailure, (state, { getErrorMessage }) => {
    return {
      ...state,
      isGetting: false,
      isGetMineSuccess: false,
      getErrorMessage,
    };
  }),

  // getList

  on(ProfileActions.getList, (state) => {
    return {
      ...state,
    };
  }),

  on(ProfileActions.getListSuccess, (state, { profiles }) => {
    return {
      ...state,
      profiles,
    };
  }),

  on(ProfileActions.getListFailure, (state, { getErrorMessage }) => {
    return {
      ...state,
      getErrorMessage,
    };
  }),

  // getById

  on(ProfileActions.getById, (state) => {
    return {
      ...state,
      isGettingById: true,
    };
  }),

  on(ProfileActions.getByIdSuccess, (state, { profile }) => {
    return {
      ...state,
      isGettingById: false,
      isGetByIdSuccess: true,
      profile: profile,
    };
  }),

  on(ProfileActions.getByIdFailure, (state, { getErrorMessageById }) => {
    return {
      ...state,
      isGettingById: false,
      isGetByIdSuccess: false,
      getErrorMessageById,
    };
  }),
);
