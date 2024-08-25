import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {PostModel} from "../../model/post.model";
import {PostService} from "../../service/post/post.service";

@Pipe({
  name: 'idToImg',
  standalone: true,
})
export class IdToImgPipe implements PipeTransform {
  constructor(private postService: PostService) {}

  transform(id: bigint): Observable<string | File[]> {
    return this.postService.getPostById(id).pipe(
      map((post: PostModel) => {
        return post.imageUrls;
      }),
    );
  }
}
