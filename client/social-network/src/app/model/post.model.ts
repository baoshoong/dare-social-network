import * as url from 'node:url';

export interface PostModel {
  uid: string;
  title: string;
  description: string;
  imageUrl: string | FileList;
  id: bigint;
}
