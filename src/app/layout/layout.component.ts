import { Component, signal, WritableSignal } from '@angular/core';
import { SideNavigationComponent } from "../side-navigation/side-navigation.component";
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { NavigationService } from '../services/navigation.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [SideNavigationComponent, NavigationBarComponent, MainPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  displaySideNav: WritableSignal<boolean> = signal(true);
  fullScreenEnabled: WritableSignal<boolean> = signal(false);
  constructor (
    private navigationService: NavigationService,
  ) {
    // const topNavObservable = this.navigationService.topNavVisible$;
    // const sideNavObservable = this.navigationService.sideNavVisible$;

    this.navigationService.sideNavVisible$.subscribe((data: boolean) => {
      this.displaySideNav.set(data);
    });
    
    this.navigationService.fullScreenEnabled$.subscribe((data: boolean) => {
      this.fullScreenEnabled.set(data);
      this.displaySideNav.set(!data);
    });

    // combineLatest([topNavObservable, sideNavObservable]).subscribe(([topnav, sidenav]) => {
    //   console.log(topnav, sidenav)
    // })
  }
}