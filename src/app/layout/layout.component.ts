import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { SideNavigationComponent } from "../side-navigation/side-navigation.component";
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { NavigationService } from '../services/navigation.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeWhile } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SideNavigationComponent, NavigationBarComponent, MainPageComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export class LayoutComponent {
  isAlive = true;
  displaySideNav: WritableSignal<boolean> = signal(true);
  fullScreenEnabled: WritableSignal<boolean> = signal(false);
  isTablet: WritableSignal<boolean> = signal(false);
  isSmallDevice: WritableSignal<boolean> = signal(false);
  readonly tabletBreakpoint = '(max-width: 1024px)';
  readonly smallDeviceBreakpoint = '(max-width: 600px)';
  // fullscreenObserver = fromEvent(document, 'keydown');

  constructor (
    private navigationService: NavigationService,
    private breakpointObserver: BreakpointObserver,
  ) {
    this.navigationService.sideNavVisible$.subscribe((data: boolean) => {
      this.displaySideNav.set(data);
    });
    
    this.navigationService.fullScreenEnabled$.subscribe((data: boolean) => {
      this.fullScreenEnabled.set(data);
      this.displaySideNav.set(!data);
    });

    this.breakpointObserver.observe([this.tabletBreakpoint, this.smallDeviceBreakpoint]).subscribe(data => {
      this.isTablet.set(data.breakpoints[this.tabletBreakpoint]);
      this.isSmallDevice.set(data.breakpoints[this.smallDeviceBreakpoint]);
      if(data.breakpoints[this.tabletBreakpoint] || data.breakpoints[this.smallDeviceBreakpoint]) {
        this.navigationService.toggleSideNavbar(false);
      } else {
        this.navigationService.toggleSideNavbar(!this.fullScreenEnabled());
      }
    });

    // this.fullscreenObserver.subscribe((data: KeyboardEvent) => {
    //   if (data.key === 'z') {
    //     this.fullScreenEnabled.set(!this.fullScreenEnabled());
    //   }
    // });
  }
}