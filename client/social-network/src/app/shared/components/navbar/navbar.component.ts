import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProfileModel } from '../../../model/profile.model';
import * as AuthActions from '../../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  subscriptions: Subscription[] = [];

  routeSelected: number = -1;
  dataRoutes = [
    { icon: 'home', routeLink: '/home' },
    { icon: 'search', routeLink: '/search' },
    { icon: 'edit_square', routeLink: '/creator' },
    { icon: 'campaign', routeLink: '/notification' },
    { icon: 'person', routeLink: '/profile' },
  ];

  constructor(
    private router: Router,
    private store: Store<{
      profile: ProfileState;
    }>,
  ) {
    this.profileMine$.subscribe((mine) => {
      this.profileMine = mine;
    });
  }

  profileMine$ = this.store.select('profile', 'mine');
  profileMine: ProfileModel | null = null;
  ngOnInit(): void {}

  navigate(index: number) {
    this.router.navigate([this.dataRoutes[index].routeLink]).then(() => {
      this.routeSelected = index;
    });
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          this.updateRouteSelected((event as NavigationEnd).urlAfterRedirects);
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  private updateRouteSelected(url: string): void {
    if (url.includes('home')) {
      this.routeSelected = 0;
    } else if (url.includes('search')) {
      this.routeSelected = 1;
    } else if (url.includes('creator')) {
      this.routeSelected = 2;
    } else if (url.includes('notification')) {
      this.routeSelected = 3;
    } else if (url.includes('profile')) {
      this.routeSelected = 4;
    } else {
      this.routeSelected = -1;
    }
  }
  logout() {
    this.store.dispatch(AuthActions.signOut());
    this.router.navigate(['/login']).then();
  }
}
