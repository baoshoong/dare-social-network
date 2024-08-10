import { ProfileModel } from '../../model/profile.model';
import { HttpErrorResponseModel } from '../../model/http-error-response.model';

export interface ProfileState {
  profiles: ProfileModel[];
  profile: ProfileModel;
  mine: ProfileModel;

  isCreating: boolean;
  isCreateSuccess: boolean;
  createErrorMessage: HttpErrorResponseModel;

  isUpdating: boolean;
  isUpdateSuccess: boolean;
  updateErrorMessage: HttpErrorResponseModel;

  isGetting: boolean;
  isGetMineSuccess: boolean;
  getErrorMessage: HttpErrorResponseModel;

  isGettingById: boolean;
  isGetByIdSuccess: boolean;
  getErrorMessageById: HttpErrorResponseModel;
}
