import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private store: Store<{
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) {}

  loginWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }
}
