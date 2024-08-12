import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { ProfileState } from '../../ngrx/profile/profile.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private store: Store<{
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) {}
  subscriptions: Subscription[] = [];
  isLoadingSignIn = false;
  ngOnInit() {
    this.subscriptions.push(
      this.store.select('auth').subscribe((auth: AuthState) => {
        this.isLoadingSignIn = auth.loading;
        if (auth.loginWithGoogleSuccess) {
          this.router.navigate(['/register']).then();
        }
      }),
    );
  }
  loginWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }
}
