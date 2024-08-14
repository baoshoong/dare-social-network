
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";
import { MaterialModule } from "../../../../shared/material.module";
import {ShareModule} from "../../../../shared/share.module";

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
  @Output() profileUpdated = new EventEmitter<{ name: string, bio: string }>();
  url: string;
  profileForm: FormGroup;
  value1 = '';
  value2 = '';

  constructor(public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.url = data.avatarUrl;
    this.profileForm = new FormGroup({
      name: new FormControl(data.name || ''),
      bio: new FormControl(data.bio || '')
    });
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

  onSaveClick(): void {
    this.avatarChanged.emit(this.url);
    this.profileUpdated.emit({
      name: this.profileForm.get('name')?.value,
      bio: this.profileForm.get('bio')?.value
    });
    this.dialog.closeAll();
  }

  protected readonly document = document;
}
