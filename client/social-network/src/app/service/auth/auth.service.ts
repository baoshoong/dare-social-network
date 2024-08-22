import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { AuthCredentialModel } from '../../model/auth.model';
import { from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}
  async signInWithGoogle() {
    const credential = await signInWithPopup(
      this.auth,
      new GoogleAuthProvider(),
    );
    const token = await credential.user.getIdToken();
    console.log('token', token);
    return {
      uid: credential.user.uid,
      userName: credential.user.displayName || '',
      email: credential.user.email,
      photoUrl: credential.user.photoURL || '',
    } as AuthCredentialModel;
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      catchError((error) => {
        return of(error);
      }),
    );
  }
}
