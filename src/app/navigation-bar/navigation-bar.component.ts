import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NavigationService } from '../services/navigation.service';
import { TooltipModule } from 'primeng/tooltip';
import { UserDto } from '../dtos/userDto';
import { AvatarComponent } from '../components/avatar.component';
import { UserService } from '../services/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    AvatarComponent,
    NgClass,
  ],
  templateUrl: './navigation-bar.component.html',
  styles: `
  .more-menu{
    position: absolute;
    top: 50px;
    right: 5px;
    width: fit-content !important;
    background-color: white;
  }
  `
})
export class NavigationBarComponent {
  value: string = '';
  sideNavVisible: boolean;
  user: WritableSignal<UserDto> = signal(null)
  moreMenuVisible: WritableSignal<boolean> = signal(false);
  isTablet: WritableSignal<boolean> = signal(false);
  isSmallDevice: WritableSignal<boolean> = signal(false);
  readonly tabletBreakpoint = '(max-width: 1024px)';
  readonly smallDeviceBreakpoint = '(max-width: 750px)'

  constructor ( 
    private navigationService: NavigationService,
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
   ) {
     this.userService.user$.subscribe((data: UserDto) => {
       this.user.set(data);
     });

    this.navigationService.sideNavVisible$.subscribe((data: boolean) => {
      this.sideNavVisible = data;
    });

    this.breakpointObserver.observe([this.tabletBreakpoint, this.smallDeviceBreakpoint]).subscribe(data => {
      this.isTablet.set(data.breakpoints[this.tabletBreakpoint]);
      this.isSmallDevice.set(data.breakpoints[this.smallDeviceBreakpoint]);
      if(!this.isSmallDevice()) {
        this.moreMenuVisible.set(false);
      }
    });

  }

  toggleSideNav() {
    this.navigationService.toggleSideNavbar(!this.sideNavVisible);
  }

  toggleMoreMenu() {
    this.moreMenuVisible.set(!this.moreMenuVisible());
  }
}
