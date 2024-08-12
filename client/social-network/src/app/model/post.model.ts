export interface PostModel {
  uid: string;
  id: bigint;
  content: string;
  title: string;
  imageUrl: string | File;
}
