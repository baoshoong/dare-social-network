import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthCredentialModel } from './model/auth.model';
import { select, Store } from '@ngrx/store';
import * as AuthActions from './ngrx/auth/auth.actions';
import { AuthState } from './ngrx/auth/auth.state';
import { combineLatest, filter, Observable, Subscription } from 'rxjs';
import { ProfileState } from './ngrx/profile/profile.state';
import { ProfileModel } from './model/profile.model';
import * as ProfileActions from './ngrx/profile/profile.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'social-network';
  uid = ' ';
  subscriptions: Subscription[] = [];
  storeIdToken$!: Observable<string>;
  storeAuthCredential$!: Observable<AuthCredentialModel>;

  loginWithGoogleSuccess$!: Observable<boolean>;

  profileMine$!: Observable<ProfileModel>;
  getProfileMineSuccess$!: Observable<boolean>;

  profileMineFailure$!: Observable<boolean>;

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{
      auth: AuthState;
      profile: ProfileState;
    }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        let idToken = await user.getIdToken(true);
        this.router.navigate(['/loading']).then();
        this.uid = user.uid;

        let auth: AuthCredentialModel = {
          uid: user.uid,
          userName: user.displayName || '',
          email: user.email || '',
          photoUrl: user.photoURL || '../public/images/avatar.png',
        };

        this.store.dispatch(AuthActions.storeIdToken({ idToken: idToken }));
        this.store.dispatch(AuthActions.storeAuthCredential({ auth: auth }));
      } else {
        this.router.navigate(['/login']).then();
      }
    });
  }

  ngOnInit(): void {
    this.storeIdToken$ = this.store.pipe(select((state) => state.auth.idToken));
    this.storeAuthCredential$ = this.store.pipe(
      select((state) => state.auth.authCredential),
    );

    this.storeIdToken$.subscribe((idToken) => {
      console.log('idToken', idToken);
    });

    this.storeAuthCredential$.subscribe((auth) => {
      if (auth) {
        console.log('auth', auth.uid);
        this.store.dispatch(ProfileActions.getMine({ uid: auth.uid }));
      }
    });

    this.profileMine$ = this.store.pipe(
      select((state) => state.profile.profile),
    );
    this.getProfileMineSuccess$ = this.store.pipe(
      select((state) => state.profile.isGetMineSuccess),
    );
    this.profileMineFailure$ = this.store.pipe(
      select((state) => state.profile.isGetMineFailure),
    );

    this.loginWithGoogleSuccess$ = this.store.pipe(
      select((state) => state.auth.loginWithGoogleSuccess),
    );
  }
}
