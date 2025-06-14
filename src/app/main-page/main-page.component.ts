import { Component, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { NavigationService } from '../services/navigation.service';
import { NgStyle } from '@angular/common';
import { ColumnDto } from '../dtos/columnDto';

@Component({
  selector: 'app-main-page',
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TooltipModule,
    NgStyle,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  value: string = '';
  fullscreenEnabled: WritableSignal<boolean> = signal(false);
  boradColumns: ColumnDto[] = [
    {
      title: 'TO DO',
      items: [
        {
          image: 'https://www.shutterstock.com/image-vector/elearning-banner-online-education-home-260nw-1694176021.jpg',
          description: 'This is a test of how the description will appear in this small little qhite box of words.',
          title: 'Testing',
          assignee: '',
        },
      ]
    },
    {
      title: 'IN PROGRESS',
      items: [],
    },
    {
      title: 'DONE',
      items: [],
    },
  ];

  constructor ( private navigationService: NavigationService ) {
    this.navigationService.fullScreenEnabled$.subscribe((data: boolean) => {
      this.fullscreenEnabled.set(data);
    });
  }

  toggleFullScreen() {
    this.navigationService.toggleFullScreen(this.fullscreenEnabled());
  }
}
