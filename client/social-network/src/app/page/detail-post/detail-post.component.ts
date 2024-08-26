import {Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, Input, OnDestroy} from '@angular/core';
import {PostModel} from '../../model/post.model';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { IdToAvatarPipe } from '../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../shared/pipes/id-to-name.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import * as PostAction from "../../ngrx/post/post.actions";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {PostState} from "../../ngrx/post/post.state";
import {ProfileState} from "../../ngrx/profile/profile.state";
import {ProfileModel} from "../../model/profile.model";

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    AsyncPipe,
    IdToNamePipe,
    IdToAvatarPipe,
    FormsModule, MatFormField, MatInput, MatLabel, ReactiveFormsModule],
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];

  postDetail$ = this.store.select('post', 'postDetail');
  mine$ = this.store.select('profile', 'mine');

  profileUser: ProfileModel = <ProfileModel>{};
  profileMine: ProfileModel = <ProfileModel>{};
  postDetails: PostModel = <PostModel>{};

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private store: Store<{
      post: PostState;
      profile: ProfileState;
    }>,
  ) {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PostAction.clearMinePost());
  }

  ngOnInit(): void {
    this.subscriptions.push(

      this.postDetail$.subscribe((post) => {
        if (post) {
          this.postDetails = post;
        }
      }),

      this.mine$.subscribe((profile) => {
        if (profile) {
          this.profileMine = profile;
        }
      }),
    );
  }

  ngAfterViewInit() {
    const imgElement = this.imageElement.nativeElement;

    imgElement.onload = () => {
      if (imgElement.naturalWidth > imgElement.naturalHeight) {
        this.renderer.addClass(imgElement, 'scale-width');
      } else {
        this.renderer.addClass(imgElement, 'scale-height');
      }
    };
  }
}
