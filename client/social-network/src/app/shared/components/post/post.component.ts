import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DetailPostComponent } from '../detail-post/detail-post.component';
import { IdToAvatarPipe } from '../../pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../pipes/id-to-name.pipe';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { ProfileModel } from '../../../model/profile.model';
import { Subscription } from 'rxjs';
import { PostModel } from '../../../model/post.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MaterialModule,
    NgForOf,
    DetailPostComponent,
    NgIf,
    IdToAvatarPipe,
    AsyncPipe,
    IdToNamePipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  constructor(
    private store: Store<{
      profile: ProfileState;
    }>,
  ) {}

  profiles = <ProfileModel>{};
  getProfile$ = this.store.select('profile', 'mine');

  subscription: Subscription[] = [];

  ngOnInit(): void {
    this.subscription.push(
      this.getProfile$.subscribe((profiles) => {
        if (profiles) {
          this.profiles = profiles;
        }
      }),
    );
  }
  @Input() post: PostModel = <PostModel>{};
  @Output() imageClick = new EventEmitter<void>();

  onImageClick() {
    this.imageClick.emit();
  }
}
