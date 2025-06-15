import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { UserDto } from '../dtos/userDto';
import { sideNavDto } from '../dtos/sideNavDto';
import { ListboxModule } from 'primeng/listbox';

@Component({
  selector: 'app-side-navigation',
  imports: [
    ListboxModule
  ],
  templateUrl: './side-navigation.component.html',
  styles: `
  :host::ng-deep .p-listbox{
    border: none;
    box-shadow: none;
  }
  :host::ng-deep .p-listbox-header{
    padding: 4px;
  }
  `
})
export class SideNavigationComponent implements OnInit {
  user: WritableSignal<UserDto> = signal(null);
  //Display variables
  showRecent: WritableSignal<boolean> = signal(false);
  showStarred: WritableSignal<boolean> = signal(false);
  showApps: WritableSignal<boolean> = signal(false);
  showPlans: WritableSignal<boolean> = signal(false);
  showProjects: WritableSignal<boolean> = signal(false);
  //Menu items
  recentItems: WritableSignal<sideNavDto[]> = signal(null);
  starredItems: WritableSignal<sideNavDto[]> = signal(null);
  appItems: WritableSignal<sideNavDto[]> = signal(null);
  planItems: WritableSignal<sideNavDto[]> = signal(null);
  projectItems: WritableSignal<sideNavDto[]> = signal(null);

  constructor (
    private userService: UserService,
    private projectService: ProjectService,
  ) {

  }

  ngOnInit(): void {
    this.userService.user$.subscribe((data: UserDto) => {
      this.user.set(data);
    })
    
    this.starredItems.set(this.userService.getStarredProjects(this.user().userId));
    this.projectItems.set(this.userService.getUserProjects(this.user().userId));
    this.recentItems.set(this.userService.getRecentItems(this.user().userId));
  }

  toggleRecent() {
    this.showRecent.set(!this.showRecent());
  }
  toggleStarred() {
    this.showStarred.set(!this.showStarred());
  }
  toggleApps() {
    this.showApps.set(!this.showApps());
  }
  togglePlans() {
    this.showPlans.set(!this.showPlans());
  }
  toggleProjects() {
    this.showProjects.set(!this.showProjects());
  }
  handleReroute() {

  }
}
