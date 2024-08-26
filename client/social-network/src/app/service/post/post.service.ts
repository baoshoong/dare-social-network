import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { PostModel, PostResponse } from '../../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClientAuth) {}

  createPost(post: PostModel) {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append(
      'imageUrl',
      post.imageUrls.length > 0 ? post.imageUrls[0] : '',
    );
    formData.append('uid', post.uid);
    formData.append('id', post.id.toString());
    return this.httpClient.post('post', formData);
  }

  getMinePost(uid: string, pageNumber: number, limitNumber: number) {
    return this.httpClient.get(
      `post?uid=${uid}&page=${pageNumber}&limit=${limitNumber}`,
    );
  }

  getAllPost(pageNumber: number, limitNumber: number) {
    console.log('get all post', pageNumber, limitNumber);
    console.log('page', pageNumber);
    console.log('limit', limitNumber);
    return this.httpClient.get(
      `post/all?page=${pageNumber}&limit=${limitNumber}`,
    );
  }

  getPostById(id: bigint) {
    return this.httpClient.get(`post/${id}`);
  }

  deletePost(id: bigint) {
    return this.httpClient.delete(`post/${id}`);
  }
}
