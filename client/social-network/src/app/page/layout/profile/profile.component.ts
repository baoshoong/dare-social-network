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
  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(EditProfileComponent);
  }
  openDialog2() {
    this.dialog.open(FollowingComponent);
  }
  openDialog3() {
    this.dialog.open(FollowersComponent);
  }

}
