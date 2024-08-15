import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileState } from '../../../ngrx/profile/profile.state';
import { Store } from '@ngrx/store';
import { AsyncPipe, NgIf } from '@angular/common';
import * as AuthActions from '../../../ngrx/auth/auth.actions';
import * as ProfileActions from '../../../ngrx/profile/profile.actions';

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
    { icon: 'home', routeLink: '/home', name: 'Home' },
    { icon: 'search', routeLink: '/search', name: 'Search' },
    { icon: 'edit_square', routeLink: '/creator', name: 'Creator' },
    { icon: 'campaign', routeLink: '/notification', name: 'Notification' },
    { icon: 'person', routeLink: '/profile', name: 'Profile' },
  ];

  constructor(
    private router: Router,
    private store: Store<{
      profile: ProfileState;
    }>,
  ) {
    this.profileMine$.subscribe((mine) => {});
  }

  profileMine$ = this.store.select('profile', 'mine');

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event) => {
          this.updateRouteSelected((event as NavigationEnd).urlAfterRedirects);
        }),
    );
    this.updateRouteSelected(this.router.url);
  }

  navigate(index: number) {
    this.router.navigate([this.dataRoutes[index].routeLink]).then(() => {
      this.routeSelected = index;
    });
  }

  ngAfterViewInit(): void {
    console.log(this.router.url);
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
    this.store.dispatch(ProfileActions.clearGetState());
    this.router.navigate(['/login']).then();
  }
}
