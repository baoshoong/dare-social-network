import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PostModel } from '../../model/post.model';
import { ProfileModel } from '../../model/profile.model';
import * as CommentAction from '../../ngrx/comment/comment.actions';
import { CommentState } from '../../ngrx/comment/comment.state';
import * as PostAction from '../../ngrx/post/post.actions';
import { PostState } from '../../ngrx/post/post.state';
import { LikeState} from "../../ngrx/like/like.state";
import { ProfileState } from '../../ngrx/profile/profile.state';
import { IdToAvatarPipe } from '../../shared/pipes/id-to-avatar.pipe';
import { IdToNamePipe } from '../../shared/pipes/id-to-name.pipe';
import { ShareModule } from '../../shared/share.module';
import * as PostActions from '../../ngrx/post/post.actions';
import * as ProfileActions from '../../ngrx/profile/profile.actions';
import * as LikeActions from '../../ngrx/like/like.actions';

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    AsyncPipe,
    IdToNamePipe,
    IdToAvatarPipe,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    ShareModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    ShareModule,
    MatIconButton,
  ],
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.scss'],
})
export class DetailPostComponent implements OnInit, OnDestroy, AfterViewInit {
  subscriptions: Subscription[] = [];

  postDetail$ = this.store.select('post', 'postDetail');
  mine$ = this.store.select('profile', 'mine');
  comments$ = this.store.select('comment', 'comments');


  profileMine: ProfileModel = <ProfileModel>{};
  postDetails: PostModel = <PostModel>{};
  postId = '';

  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private store: Store<{
      post: PostState;
      profile: ProfileState;
      comment: CommentState;
    }>,
    private activeRoute: ActivatedRoute
  ) {
    const { url } = this.activeRoute.snapshot.params;
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
        if (post.id) {
          this.postDetails = post;
          //parse postId to string
          this.postId = String(this.postDetails.id);
          console.log('postId:', this.postId);
          this.store.dispatch(
            CommentAction.GetComments({ postId: this.postId })
          );

          console.log('postDetails:', this.postDetails);
        }
      }),

      this.mine$.subscribe((profile) => {
        if (profile) {
          this.profileMine = profile;
        }
      })

    );
  }

  onExit() {
    console.log('exit');
    this.router.navigate(['/home']).then(() => {
      this.store.dispatch(PostAction.clearMinePost());
    });
  }

  isLiked = false;

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  navigateToProfile() {
    this.router.navigateByUrl(`/profile/${this.postDetails.uid}`).then();
    this.store.dispatch(PostActions.clearMinePost());
  }

  navigateToMineProfile() {
    this.router.navigateByUrl(`/profile/${this.profileMine.uid}`).then();
    this.store.dispatch(PostActions.clearMinePost());
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

    const commentListElement =
      this.el.nativeElement.querySelector('.comment-list');
    const hasScrollbar =
      commentListElement.scrollHeight > commentListElement.clientHeight;

    if (!hasScrollbar) {
      this.renderer.setStyle(commentListElement, 'padding-right', '23px');
    }
  }

  createComment() {
    const comment = this.commentForm.value;
    if (!comment.content) {
      return;
    } else {
      this.store.dispatch(
        CommentAction.createComment({
          content: comment.content,
          postId: this.postDetails.id,
          uid: this.profileMine.uid,
        })
      );
    }
  }

  createLike() {
    if(!this.isLiked){
      this.store.dispatch(LikeActions.createLike({
        like: {
          postId: this.postDetails.id,
          uid: this.profileMine.uid,
        }
      }
      ));
      this.isLiked = true;
  }else{
      this.isLiked = false;
      console.log("like removed")
    }}
}
