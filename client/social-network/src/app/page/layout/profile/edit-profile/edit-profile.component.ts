import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MaterialModule } from '../../../../shared/material.module';
import { ShareModule } from '../../../../shared/share.module';
import { Store } from '@ngrx/store';
import { StorageState } from '../../../../ngrx/storage/storage.state';
import { StorageModel } from '../../../../model/storage.model';
import * as StorageActions from '../../../../ngrx/storage/storage.actions';
import { Subscription } from 'rxjs';
import { ProfileModel } from '../../../../model/profile.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MaterialModule, ShareModule],
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.scss'],
})


export class EditProfileComponent implements OnInit, OnDestroy {
  @Output() avatarChanged = new EventEmitter<string>();
  url: string;
  protected readonly document = document;
  profileForm: ProfileModel = {
    bio: '',
    uid: '',
    userName: '',
    email: '',
    avatarUrl: '',

}
  editProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    bio: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });

  myFile: File[] = [];

  subscription: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    public store: Store<{
      storage: StorageState;
    }>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.url = data.avatarUrl;
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
        this.url = event.target.result;
      };
    }
  }
  clearInput(): void {
    this.editProfileForm.setValue({
      name: '',
      bio: '',
    });
  }
  onSaveClick(): void {
    this.avatarChanged.emit(this.url);

    this.profileForm = {
      uid: this.profileForm.uid,
      avatarUrl: this.url,
      email: this.profileForm.email,
      bio: this.editProfileForm.value.bio ?? '',
      userName: this.editProfileForm.value.name ?? '',//neu null thi rong
    };
    console.log(this.profileForm);

    // this.myFile.forEach((file) => {
    //   this.store.dispatch(
    //     StorageActions.uploadFile({ file, fileName: file.name }),
    //   );
    // });
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
