import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { NavigationService } from '../services/navigation.service';
import { NgStyle } from '@angular/common';
import { ColumnDto } from '../dtos/columnDto';
import { UserDto } from '../dtos/userDto';
import { UserService } from '../services/user.service';
import { AvatarComponent } from '../components/avatar.component';
import { ItemTypeEnum } from '../enums/itemTypeEnum';
import { ItemPriorityEnum } from '../enums/itemPriorityEnum';
import { ItemStatusEnum } from '../enums/itemStatusEnum';

@Component({
  selector: 'app-main-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TooltipModule,
    NgStyle,
    AvatarComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  readonly itemType = ItemTypeEnum;
  readonly itemStatus = ItemStatusEnum;
  readonly itemPriority = ItemPriorityEnum;
  value: string = '';
  newColumnTitle: string = '';
  fullscreenEnabled: WritableSignal<boolean> = signal(false);
  creatingColumn: WritableSignal<boolean> = signal(false);
  user: WritableSignal<UserDto> = signal(new UserDto());
  boradColumns: ColumnDto[] = [
    {
      title: 'TO DO',
      items: [
        {
          itemId: '1',
          image: 'https://www.shutterstock.com/image-vector/elearning-banner-online-education-home-260nw-1694176021.jpg',
          title: 'Testing',
          assignee: '4',
          type: this.itemType.bug,
          dateCreated: new Date(),
          priority: this.itemPriority.none,
        },
      ]
    },
    {
      title: 'IN PROGRESS',
      items: [
        {
          itemId: '2',
          image: '',
          title: 'Testing',
          assignee: '4',
          type: this.itemType.bug,
          dateCreated: new Date(),
          priority: this.itemPriority.none,
        },{
          itemId: '3',
          image: '',
          title: 'Testing',
          assignee: '4',
          type: this.itemType.bug,
          dateCreated: new Date(),
          priority: this.itemPriority.none,
        },
      ],
    },
    {
      title: 'DONE',
      items: [
        {
          itemId: '2',
          image: '',
          title: 'Testing',
          assignee: '4',
          type: this.itemType.bug,
          dateCreated: new Date(),
          priority: this.itemPriority.none,
        },{
          itemId: '3',
          image: '',
          title: 'Testing',
          assignee: '4',
          type: this.itemType.bug,
          dateCreated: new Date(),
          priority: this.itemPriority.none,
        },
      ],
    },
  ];
  userList: WritableSignal<UserDto[]> = signal([]);

  constructor ( 
    private navigationService: NavigationService,
    private userService: UserService,
   ) {
    this.navigationService.fullScreenEnabled$.subscribe((data: boolean) => {
      this.fullscreenEnabled.set(data);
    });

    this.userService.user$.subscribe((data: UserDto) => {
      this.user.set(data);
    });
  }

  ngOnInit(): void {
    this.userList.set(this.userService.userGetTeam(this.user().teams[0]));
  }

  toggleFullScreen() {
    this.navigationService.toggleFullScreen(this.fullscreenEnabled());
  }

  toggleColumnCreation(display: boolean = true) {
    this.creatingColumn.set(display);
  }

  addNewColumn() {
    this.boradColumns.push(new ColumnDto(this.newColumnTitle));
    this.newColumnTitle = '';
    this.creatingColumn.set(false);
  }

  renameColumn() {

  }

  moveColumn(index: number, moveLeft: boolean) {
    if ((moveLeft && index === 0) || (!moveLeft && index === this.boradColumns.length - 1) || this.boradColumns.length === 1) {
      return;
    }
    const columnToMove = this.boradColumns[index];
    const direction = moveLeft ? -1 : 1;
    this.boradColumns.slice(index, 1);
    this.boradColumns.splice(index + direction, 0, columnToMove);
  }

  setColumnLimit(index: number, limit: number) {
    this.boradColumns[index].itemLimit = limit;
  }

  deleteColumn(index: number) {
    const test = this.boradColumns.slice(index, 1);
  }

  addColumnItem(index: number) {
    if (this.boradColumns[index].items.length === this.boradColumns[index].itemLimit) {
      return;
    };
  }
}
