import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { UserDto } from '../dtos/userDto';
import { UserService } from '../services/user.service';
import { AvatarComponent } from '../components/avatar.component';
import { ItemTypeEnum } from '../enums/itemTypeEnum';
import { ItemPriorityEnum } from '../enums/itemPriorityEnum';
import { ItemStatusEnum } from '../enums/itemStatusEnum';
import { ColumnComponent } from '../components/column.component';
import { ProjectDto } from '../dtos/projectDto';
import { ProjectService } from '../services/project.service';
import { ProjectHeaderComponent } from '../project-header/project-header.component';
import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-main-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TooltipModule,
    ProjectHeaderComponent,
    AvatarComponent,
    ColumnComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  readonly itemType = ItemTypeEnum;
  readonly itemStatus = ItemStatusEnum;
  readonly itemPriority = ItemPriorityEnum;
  value: string;
  newColumnTitle: string;
  sideNavVisible: WritableSignal<boolean> = signal(null);
  fullscreenEnabled: WritableSignal<boolean> = signal(false);
  creatingColumn: WritableSignal<boolean> = signal(false);
  user: WritableSignal<UserDto> = signal(null);
  userList: WritableSignal<UserDto[]> = signal([]);
  project: WritableSignal<ProjectDto> = signal(null);

  constructor ( 
    private userService: UserService,
    private projectService: ProjectService,
    private navigationService: NavigationService,
   ) {
    this.userService.user$.subscribe((data: UserDto) => {
      this.user.set(data);
    });

    this.navigationService.sideNavVisible$.subscribe((data: boolean) => {
      this.sideNavVisible.set(data);
    });
  }

  ngOnInit(): void {
    this.getGetUserList();
    this.getProject();
  }

  getGetUserList() {
    this.userList.set(this.userService.userGetTeam(this.user().teams[0]));
    this.userList().splice(0, 0, new UserDto());
  }

  getProject() {
    this.project.set(this.projectService.getProject('7c6102b0-ad6e-46de-92a2-a7b39ce9607e'));
  }

  toggleColumnCreation(display: boolean = true) {
    this.creatingColumn.set(display);
  }

  addNewColumn() {
    this.projectService.addNewColumn(this.project().projectId, this.newColumnTitle);
  }
}
