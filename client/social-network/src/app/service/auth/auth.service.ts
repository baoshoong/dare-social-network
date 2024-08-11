import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { AuthCredentialModel } from '../../model/auth.model';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private profileService: ProfileService,
  ) {}
  currentUser: any;
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

  async logout() {
    try {
      await signOut(this.auth);
      console.log('Logout success');
    } catch (error) {
      console.error('Logout failed');
    }
  }

  async checkUserProfile(uid: string): Promise<boolean> {
    try {
      const profile = await this.profileService.getById(uid).toPromise();
      return !!profile;
    } catch (error) {
      return false;
    }
  }
}
