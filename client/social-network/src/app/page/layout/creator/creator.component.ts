import { Component, ElementRef, ViewChild } from '@angular/core';
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
  ],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss',
})
export class CreatorComponent {
  profileMine$ = this.store.select('profile', 'mine');
  uid = '';

  constructor(
    private store: Store<{
      profile: ProfileState;
    }>,
  ) {
    this.profileMine$.subscribe((mine) => {
      if (mine) {
        this.uid = mine.uid;
      }
    });
  }
  createPostForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  postForm: PostModel = {
    uid: '',
    title: '',
    description: '',
    imageUrl: '',
    id: BigInt(1),
  };

  imageSrc: string | ArrayBuffer | null | undefined = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(input.files[0]);

      this.postForm.imageUrl = input.files;
      console.log('Post Form: ', this.postForm);
    }
  }
  clearInputData() {
    this.createPostForm.setValue({
      title: '',
      description: '',
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
    console.log('Description: ', this.createPostForm.value.description);
    console.log('Image: ', this.postForm.imageUrl);
    this.postForm = {
      uid: this.uid,
      id: BigInt(1),
      title: this.createPostForm.value.title,
      description: this.createPostForm.value.description ?? '',
      imageUrl: this.postForm.imageUrl,
    };

    console.log('Post Form: ', this.postForm);
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
      description: '',
    });
  }
}
