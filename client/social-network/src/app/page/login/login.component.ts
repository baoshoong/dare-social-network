import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { AuthState } from '../../ngrx/auth/auth.state';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../ngrx/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(private store: Store<{ auth: AuthState }>) {}
  subscriptions: Subscription[] = [];
  isLoadingSignIn = false;
  auth$ = this.store.select('auth', 'authCredential');
  ngOnInit() {}
  loginWithGoogle() {
    this.store.dispatch(AuthActions.signInWithGoogle());
  }

  logout() {
    this.store.dispatch(AuthActions.signOut());
  }
}
