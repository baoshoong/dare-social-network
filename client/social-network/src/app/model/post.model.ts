export interface PostModel {
  uid: string;
  title: string;
  content: string;
  imageUrls: string | File[];
  id: bigint;
}

export interface PostResponse {
  data: PostModel[];
  count: number;
  pageNumber: number;
  limitNumber: number;
}
