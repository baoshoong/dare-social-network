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
        this.uid = user.uid;

        let auth: AuthCredentialModel = {
          uid: user.uid,
          userName: user.displayName || '',
          email: user.email || '',
          photoUrl: user.photoURL || '',
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

    combineLatest([
      this.profileMine$,
      this.getProfileMineSuccess$,
      this.storeAuthCredential$,
    ]).subscribe(([mine, getProfileMineSuccess, storeAuthCredential]) => {
      const { email: authEmail } = storeAuthCredential;
      const { email: profileEmail } = mine;
      if (authEmail && getProfileMineSuccess) {
        if (profileEmail) {
          const isAuthRoute = ['/login', '/register'].includes(this.router.url);
          const route = isAuthRoute ? '/home' : this.router.url;
          console.log(isAuthRoute ? 'home' : 'reload');
          this.router.navigate([route]).then();
        }
      } else if (authEmail && getProfileMineSuccess) {
        if (!mine.email) {
          // this.router.navigate(['/register']).then();
        }
      }
    });

    this.loginWithGoogleSuccess$ = this.store.pipe(
      select((state) => state.auth.loginWithGoogleSuccess),
    );

    this.loginWithGoogleSuccess$.subscribe((loginWithGoogleSuccess) => {
      if (loginWithGoogleSuccess) {
        // this.router.navigate(['/register']).then();
      }
    });
  }
}
