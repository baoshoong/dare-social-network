import { PostModel } from './post.model';

export interface PostDataModel {
  data: {
    posts: PostModel[];
  };
  "count": number;
  "pageNumber": number;
  "limitNumber": number;
}
