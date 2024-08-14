export interface PostModel {
  uid: string;
  title: string;
  content: string;
  imageUrl: string | File[];
  id: bigint;
}
