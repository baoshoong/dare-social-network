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

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MaterialModule, ShareModule],
  templateUrl: 'edit-profile.component.html',
  styleUrls: ['edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  @Output() avatarChanged = new EventEmitter<string>();
  @Output() profileUpdated = new EventEmitter<{ name: string; bio: string }>();
  url: string;
  profileForm: FormGroup;
  value1 = '';
  value2 = '';

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
    this.profileForm = new FormGroup({
      name: new FormControl(data.name || ''),
      bio: new FormControl(data.bio || ''),
    });
  }

  isUploading$ = this.store.select('storage', 'isUploading');

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push(this.isUploading$.subscribe((isUploading) => {}));
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

  onSaveClick(): void {
    this.avatarChanged.emit(this.url);
    this.profileUpdated.emit({
      name: this.profileForm.get('name')?.value,
      bio: this.profileForm.get('bio')?.value,
    });
    this.myFile.forEach((file) => {
      this.store.dispatch(
        StorageActions.uploadFile({ file, fileName: file.name }),
      );
    });
    this.dialog.closeAll();
  }

  protected readonly document = document;
}
