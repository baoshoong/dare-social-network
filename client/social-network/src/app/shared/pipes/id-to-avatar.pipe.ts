import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from '../../service/profile/profile.service';
import { map } from 'rxjs/operators';
import { ProfileModel } from '../../model/profile.model';

@Pipe({
  name: 'idToAvatar',
  standalone: true,
})
export class IdToAvatarPipe implements PipeTransform {
  constructor(private profileService: ProfileService) {}

  transform(uid: string): Observable<string> {
    return this.profileService.getById(uid).pipe(
      map((profile: ProfileModel) => {
        return profile.avatarUrl;
      }),
    );
  }
}
