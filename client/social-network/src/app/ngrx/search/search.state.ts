import { HttpErrorResponseModel } from '../../model/http-error-response.model';
import { CommonSearchResultModel } from '../../model/search.model';

export interface SearchState {
  searchResult: CommonSearchResultModel;

  searchResultLoading: boolean;
  searchResultFailure: HttpErrorResponseModel;
}
