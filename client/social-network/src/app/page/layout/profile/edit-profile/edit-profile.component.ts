import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../../shared/material.module';
import { ShareModule } from '../../../../shared/share.module';
import { Store } from '@ngrx/store';
import { StorageState } from '../../../../ngrx/storage/storage.state';
import { StorageModel } from '../../../../model/storage.model';
import * as StorageActions from '../../../../ngrx/storage/storage.actions';
import { Subscription } from 'rxjs';
import { ProfileModel } from '../../../../model/profile.model';
import { ProfileState } from '../../../../ngrx/profile/profile.state';
import * as ProfileActions from '../../../../ngrx/profile/profile.actions';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MaterialModule, ShareModule],
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @Output() avatarChanged = new EventEmitter<string>();
  urlsa: string;
  myAvatarUrl: string[] = [];
  myFile: File[] = [];
  myUrl: string = '';

  protected document = document;
  profileForm: ProfileModel = {
    bio: '',
    uid: '',
    userName: '',
    email: '',
    avatarUrl: '',
  };
  editProfileForm = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl(''),
    uid: new FormControl(''),
    email: new FormControl(''),
  });

  subscription: Subscription[] = [];

  imageUrls$ = this.store.select('storage', 'url');

  isUploading$ = this.store.select('storage', 'isUploading');

  profileMine$ = this.store.select('profile', 'mine');

  constructor(
    public dialog: MatDialog,
    public store: Store<{
      storage: StorageState;
      profile: ProfileState;
    }>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.urlsa = data.avatarUrl;
  }
  ngOnInit(): void {
    this.subscription.push(
      this.profileMine$.subscribe((profile) => {
        if (profile) {
          this.editProfileForm.setValue({
            name: profile.userName,
            bio: profile.bio,
            uid: profile.uid,
            email: profile.email,
          });
        }
      }),

      this.imageUrls$.subscribe((urls) => {
        if (urls) {
          console.log(urls);
          urls.forEach((url) => {
            this.myAvatarUrl.push(url);
            this.profileForm.avatarUrl = url;
            console.log(this.profileForm.avatarUrl);
          });
        }
      }),
    );
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  onSelectedFile(e: any): void {
    if (e.target.files) {
      console.log(e.target.files);
      Array.from(e.target.files).forEach((value) => {
        const file = value as File;
        this.myFile.push(file);
        console.log(this.myFile);
      });
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.urlsa = event.target.result;
      };
      this.myFile.forEach((file) => {
        this.store.dispatch(
          StorageActions.uploadFile({ file, fileName: file.name }),
        );
      });
    }
  }
  clearInput(): void {
    this.editProfileForm.setValue({
      name: '',
      bio: '',
      uid: '',
      email: this.editProfileForm.value.email ?? '',
    });
  }
  onSaveClick(): void {
    // this.avatarChanged.emit(this.url);

    // this.myAvatarUrl[0].forEach((url) => {
    //   this.profileForm.avatarUrl = url;
    //   console.log(this.profileForm.avatarUrl);
    // });

    this.profileForm = {
      uid: this.editProfileForm.value.uid ?? '',
      avatarUrl: this.profileForm.avatarUrl ?? '',
      email: this.editProfileForm.value.email ?? '',
      bio: this.editProfileForm.value.bio ?? '',
      userName: this.editProfileForm.value.name ?? '', //neu null thi rong
    };
    console.log(this.profileForm);
    this.store.dispatch(ProfileActions.updateMine({ mine: this.profileForm }));

    // this.dialog.closeAll();
    // this.clearInput();
  }
  clearName(): void {
    this.editProfileForm.patchValue({
      name: '',
    });
  }
  clearBio(): void {
    this.editProfileForm.patchValue({
      bio: '',
    });
  }
}
