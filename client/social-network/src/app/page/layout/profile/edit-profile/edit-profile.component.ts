import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MaterialModule} from "../../../../shared/material.module";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
   MaterialModule
  ],
  templateUrl: 'edit-profile.component.html',
  styleUrl: 'edit-profile.component.scss'
})
export class EditProfileComponent {
  constructor(public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialog.closeAll();
  }
}
