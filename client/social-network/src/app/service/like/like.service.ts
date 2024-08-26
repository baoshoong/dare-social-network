import { Injectable } from '@angular/core';
import {HttpClientAuth} from "../../util/http-client-auth";
import {LikeModel} from "../../model/like.model";

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor( private httpClient: HttpClientAuth) { }

  createLike(like: LikeModel) {
    console.log(like);
    return this.httpClient.post('like', like);
  }

}
