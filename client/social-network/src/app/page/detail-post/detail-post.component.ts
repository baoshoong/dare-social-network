import {Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild, Input, OnDestroy} from '@angular/core';
import {PostModel} from '../../model/post.model';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { IdToAvatarPipe } from '../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../shared/pipes/id-to-name.pipe';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import * as PostAction from "../../ngrx/post/post.actions";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {PostState} from "../../ngrx/post/post.state";
import {ProfileState} from "../../ngrx/profile/profile.state";
import {ProfileModel} from "../../model/profile.model";
import {ShareModule} from "../../shared/share.module";
import * as CommentAction from "../../ngrx/comment/comment.actions";
import {CommentState} from "../../ngrx/comment/comment.state";
import {CommentModel} from "../../model/comment.model";
import {ActivatedRoute} from "@angular/router";
import * as LikeAction from "../../ngrx/like/like.actions";

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    AsyncPipe,
    IdToNamePipe,
    IdToAvatarPipe,
    FormsModule, MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatButton,
    ShareModule,
  ],
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
  postId = '';

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;
  constructor(
    private renderer: Renderer2,
    private store: Store<{
      post: PostState;
      profile: ProfileState;
      comment: CommentState;
    }>,
    private activeRoute: ActivatedRoute,

  ) {

      const {url} = this.activeRoute.snapshot.params;
    console.log('postId:', url);


  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(PostAction.clearMinePost());
  }

  commentForm = new FormGroup({
    content: new FormControl(''),
  });




  ngOnInit(): void {

    this.subscriptions.push(

      this.postDetail$.subscribe((post) => {
        if (post) {

          this.postDetails = post;
          //parse postId to string
          this.postId = String(this.postDetails.id);
          this.store.dispatch(CommentAction.GetComments( {postId: this.postId} ));

          console.log('postDetails:', this.postDetails);
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

  createComment() {

    const comment = this.commentForm.value;
    if (!comment.content) {
      return
    }else {
      this.store.dispatch(CommentAction.createComment({
        content: comment.content,
        postId: this.postDetails.id,
        uid: this.profileMine.uid,
      }));
    }
  }

  // likeAction() {
  //   if (this.postDetails.isLiked) {
  //     this.removeLike();
  //   } else {
  //     this.createLike();
  //   }
  // }

  createLike() {
    this.store.dispatch(LikeAction.createLike({
      like:{
      postId: this.postDetails.id,
      uid: this.profileMine.uid,
      }
    }));
  }

}
