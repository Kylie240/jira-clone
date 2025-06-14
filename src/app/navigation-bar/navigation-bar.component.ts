import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../services/navigation.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  value: string = '';
  sideNavVisible: boolean;

  constructor ( private navigationService: NavigationService ) {
    this.navigationService.sideNavVisible$.subscribe((data: boolean) => {
      this.sideNavVisible = data;
    });
  }

  toggleSideNav() {
    this.navigationService.toggleSideNavbar(!this.sideNavVisible);
  }
}
