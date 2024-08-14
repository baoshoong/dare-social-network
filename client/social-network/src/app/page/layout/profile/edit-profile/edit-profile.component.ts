
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";
import { MaterialModule } from "../../../../shared/material.module";
import {ShareModule} from "../../../../shared/share.module";
import {ProfileModel} from "../../../../model/profile.model";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    MaterialModule,
    ShareModule
  ],
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.scss']
})
export class EditProfileComponent {
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
    name: new FormControl(''),
    bio: new FormControl(''),
  });

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.url = data.avatarUrl;
  }
  onSelectedFile(e: any): void {
    if (e.target.files) {
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
    this.dialog.closeAll();
    this.clearInput();
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
