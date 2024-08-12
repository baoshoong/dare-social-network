import {Component, inject} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatDialog, MatDialogActions, MatDialogRef} from "@angular/material/dialog";
import {EditAvatarComponent} from "./edit-avatar/edit-avatar.component";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
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
  readonly dialogRef = inject(MatDialogRef<MatDialogActions>)
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    this.dialog.open(EditAvatarComponent)
  }
  onNoClick(): void {
    this.dialogRef.close()
  }

}
