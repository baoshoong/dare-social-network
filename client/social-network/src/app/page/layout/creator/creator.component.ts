import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { PostModel } from '../../../model/post.model';
import { ShareModule } from '../../../shared/share.module';
import { Store } from '@ngrx/store';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import * as PostAction from '../../../ngrx/post/post.actions';
import { PostState } from '../../../ngrx/post/post.state';
import { LoadingComponent } from '../../loading/loading.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    NgIf,
    ShareModule,
    ReactiveFormsModule,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent implements OnInit, OnDestroy {
  profileMine$ = this.store.select('profile', 'mine');
  uid = '';

  subscription: Subscription[] = [];
  isLoading = true;
  isCreating$ = this.store.select('post', 'isCreating');

  constructor(
    private store: Store<{
      profile: ProfileState;
      post: PostState;
    }>,
  ) {
    this.subscription.push(
      this.profileMine$.subscribe((profile) => {
        this.uid = profile.uid;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  myFile: File[] = [];

  ngOnInit(): void {
    this.subscription.push(
      this.isCreating$.subscribe((isCreating) => {
        this.isLoading = isCreating;
        console.log('isCreating: ', isCreating);
      }),
    );
  }

  imageUrl = new FormControl(new Array<File>());

  createPostForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });
  postForm: PostModel = {
    uid: '',
    title: '',
    content: '',
    imageUrl: this.myFile as File[],
    id: BigInt(1),
  };

  imageSrc: string | ArrayBuffer | null | undefined = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.myFile = [];

    if (input.files && input.files[0]) {
      Array.from(input.files).forEach((file) => {
        this.myFile.push(file); // Ensure myFile is an array and push files into it
      });
      const reader = new FileReader();
      console.log('input.files: ', input.files);
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(input.files[0]);

      console.log('Post Form: ', this.postForm);
    }
    console.log('My File: ', this.myFile);
  }
  clearInputData() {
    this.createPostForm.setValue({
      title: '',
      content: '',
    });
    this.imageSrc = null;
  }
  createPost() {
    const inputFilled = this.createPostForm.value?.title?.trim() !== '';
    const imageSrcFilled =
      typeof this.imageSrc === 'string' && this.imageSrc.trim() !== '';
    //
    // console.log('Title: ', this.createPostForm.value.title);
    // console.log('Description: ', this.createPostForm.value.description);
    // console.log('Image: ', this.imageSrc);

    if (!inputFilled || !imageSrcFilled) {
      alert('Please fill in all fields');
      return;
    }

    this.createPostForm.value.title = this.textLimit(
      this.createPostForm.value?.title as string,
      40,
    );
    console.log('Title: ', this.createPostForm.value.title);
    console.log('Description: ', this.createPostForm.value.content);
    console.log('Image: ', this.postForm.imageUrl);
    this.postForm = {
      uid: this.uid,
      id: BigInt(1),
      title: this.createPostForm.value.title,
      content: this.createPostForm.value.content ?? '',
      imageUrl: this.myFile,
    };

    console.log('Post Form: ', this.postForm);
    this.store.dispatch(PostAction.createPost({ post: this.postForm }));

    this.clearInputData();
  }
  textLimit(text: string, wordLimit: number): string {
    const words = text.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ');
    }
    return text;
  }
  clearTitle() {
    this.createPostForm.patchValue({
      title: '',
    });
  }
  clearDescription() {
    this.createPostForm.patchValue({
      content: '',
    });
  }
}
