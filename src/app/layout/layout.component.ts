import { Component, signal, WritableSignal } from '@angular/core';
import { SideNavigationComponent } from "../side-navigation/side-navigation.component";
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-layout',
  imports: [SideNavigationComponent, NavigationBarComponent, MainPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  displaySideNav: WritableSignal<boolean> = signal(true);
  constructor (
    private navigationService: NavigationService,
  ) {
    this.navigationService.sideNavVisible$.subscribe((data: boolean) => {
      this.displaySideNav.set(!this.displaySideNav());
    })
  }
}
