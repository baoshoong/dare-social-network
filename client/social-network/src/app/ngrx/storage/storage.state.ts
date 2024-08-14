import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { StorageModel } from '../../model/storage.model';

export interface StorageState {
  url: string[];
  storage: StorageModel;
  isUploading: boolean;
  uploadError: HttpErrorResponseModel;
}
