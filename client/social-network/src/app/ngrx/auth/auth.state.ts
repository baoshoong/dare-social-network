import { AuthCredentialModel } from '../../model/auth.model';

export interface AuthState {
  idToken: string;
  authCredential: AuthCredentialModel;

  isLoading: boolean;
  isSuccess: boolean;

  logOutSuccess: boolean;

  error: any;
}
