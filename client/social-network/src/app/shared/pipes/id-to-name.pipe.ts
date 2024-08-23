import { Pipe, PipeTransform } from '@angular/core';
import { ProfileService } from '../../service/profile/profile.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileModel } from '../../model/profile.model';
import {PostModel} from "../../model/post.model";

@Pipe({
  name: 'idToName',
  standalone: true,
})
export class IdToNamePipe implements PipeTransform {
  constructor(private profileService: ProfileService) {}

  transform(uid: string): Observable<string> {
    return this.profileService.getById(uid).pipe(
      map((profile: ProfileModel) => {
        return profile.userName;
      }),
    );
  }
}
