import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { filter, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MaterialModule],
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateRouteSelected(this.router.url);
  }

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
    } else if (url.includes('ebooks')) {
      this.routeSelected = 1;
    } else if (url.includes('authors')) {
      this.routeSelected = 2;
    } else if (url.includes('categories')) {
      this.routeSelected = 3;
    } else if (url.includes('profile')) {
      this.routeSelected = 4;
    } else {
      this.routeSelected = -1;
    }
  }
}
