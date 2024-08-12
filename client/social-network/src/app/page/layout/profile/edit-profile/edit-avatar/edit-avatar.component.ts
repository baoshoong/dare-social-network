import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-edit-avatar',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './edit-avatar.component.html',
  styleUrl: './edit-avatar.component.scss'
})
export class EditAvatarComponent {
  removeAvatar() {
    // remove avatar
  }
  cancel() {
    // cancel
  }
  onFileChange() {
    // on file change
  }
}
