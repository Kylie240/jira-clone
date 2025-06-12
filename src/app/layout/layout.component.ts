import { Component } from '@angular/core';
import { SideNavigationComponent } from "../side-navigation/side-navigation.component";
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MainPageComponent } from '../main-page/main-page.component';

@Component({
  selector: 'app-layout',
  imports: [SideNavigationComponent, NavigationBarComponent, MainPageComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
