import { ChangeDetectionStrategy, Component, signal, Signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../services/navigation.service';
import { TooltipModule } from 'primeng/tooltip';
import { UserDto } from '../dtos/userDto';
import { AvatarComponent } from '../components/avatar.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    AvatarComponent,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  value: string = '';
  sideNavVisible: boolean;
  user: WritableSignal<UserDto> = signal(null)

  constructor ( 
    private navigationService: NavigationService,
    private userService: UserService,
   ) {
     this.userService.user$.subscribe((data: UserDto) => {
       this.user.set(data);
     });

    this.navigationService.sideNavVisible$.subscribe((data: boolean) => {
      this.sideNavVisible = data;
    });

  }

  toggleSideNav() {
    this.navigationService.toggleSideNavbar(!this.sideNavVisible);
  }
}
