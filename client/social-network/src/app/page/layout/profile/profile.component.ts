import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {FollowingComponent} from "./following/following.component";
import {FollowersComponent} from "./followers/followers.component";
import {MaterialModule} from "../../../shared/material.module";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  name: string = 'Current Name';
  bio: string = 'Current Bio';
  avatarUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';

  constructor(public dialog: MatDialog) {
  }

  openDialog2() {
    this.dialog.open(FollowingComponent);
  }

  openDialog3() {
    this.dialog.open(FollowersComponent);
  }

  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data: {
        avatarUrl: this.avatarUrl,
        name: this.name,
        bio: this.bio
      }
    });
    dialogRef.componentInstance.avatarChanged.subscribe((newAvatarUrl: string) => {
      this.avatarUrl = newAvatarUrl;
      this.name = dialogRef.componentInstance.editProfileForm.value.name ?? '';
      this.bio = dialogRef.componentInstance.editProfileForm.value.bio ?? '';
    });

  }
}
