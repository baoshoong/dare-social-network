import { AuthCredentialModel } from '../../model/auth.model';

export interface AuthState {
  idToken: string;
  authCredential: AuthCredentialModel;
  loading: boolean;
  error: any;
}
