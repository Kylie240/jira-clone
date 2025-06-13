import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  value: string = '';

  constructor ( private navigationService: NavigationService ) {}

  toggleSideNav() {
    this.navigationService.toggleSideNavbar();
  }
}
