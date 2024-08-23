import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../service/auth/auth.service';
import { from, switchMap } from 'rxjs';
import * as AuthActions from './auth.actions';
import { AuthCredentialModel } from '../../model/auth.model';

@Injectable()
export class AuthEffects {
  signInWithGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWithGoogle),
      switchMap(() => {
        return from(
          this.authService
            .signInWithGoogle()
            .then((authCredential: AuthCredentialModel) => {
              return AuthActions.storeAuthCredential({ auth: authCredential });
            })
            .catch((error) => {
              return AuthActions.signInWithGoogleFailure({ error });
            }),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
