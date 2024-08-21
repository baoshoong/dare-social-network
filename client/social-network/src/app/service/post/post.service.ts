import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { PostModel } from '../../model/post.model';
import {PostDataModel} from "../../model/post-data.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postData: PostDataModel[] = [];
  constructor(private httpClient: HttpClientAuth) {}

  createPost(post: PostModel) {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append(
      'imageUrl',
      post.imageUrl.length > 0 ? post.imageUrl[0] : '',
    );
    formData.append('uid', post.uid);
    formData.append('id', post.id.toString());
    return this.httpClient.post('post', formData);
  }
  getAllPost(limit: number, page: number) {
    return this.httpClient.get(`post?limit=${limit}&page=${page}`);
  }
}
