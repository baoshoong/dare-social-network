import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareModule } from '../../shared/share.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileModel } from '../../model/profile.model';
import { Subscription } from 'rxjs';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import * as profileActions from '../../ngrx/profile/profile.actions';
import { MaterialModule } from '../../shared/material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ShareModule, MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<{ profileState: ProfileState; auth: AuthState }>,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.store.select('auth').subscribe((auth: AuthState) => {
        if (auth.authCredential) {
          this.regisForm.patchValue({
            email: auth.authCredential.email,
            avatarUrl: auth.authCredential.photoUrl,
            uid: auth.authCredential.uid,
          });
          console.log('auth', auth);
        }
      }),
    );
  }
  subscription: Subscription[] = [];
  regisForm = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl('', Validators.required),
    avatarUrl: new FormControl(''),
    uid: new FormControl(''),
  });

  regisData: ProfileModel = {
    email: '',
    userName: '',
    uid: '',
    bio: '',
    avatarUrl: '',
  };

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  register() {
    this.regisData = {
      email: this.regisForm.value.email ?? '',
      userName: this.regisForm.value.userName ?? '',
      uid: this.regisForm.value.uid ?? '',
      bio: '',
      avatarUrl: this.regisForm.value.avatarUrl ?? '',
    };

    console.log(this.regisData);

    this.store.dispatch(profileActions.createMine({ mine: this.regisData }));
  }
}
