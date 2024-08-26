import { Injectable } from '@angular/core';
import {HttpClientAuth} from "../../util/http-client-auth";
import {CommentModel} from "../../model/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor( private httpClient: HttpClientAuth) {}

  createComment(content: string, postId: bigint, uid: string) {
    return this.httpClient.post('comment', { postId, uid, content });
  }

  getComments(postId: string) {
    return this.httpClient.get(`comment?postId=${postId}`);
  }

}
