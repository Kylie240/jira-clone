import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-main-page',
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    TooltipModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  value: string = '';
  boradColumns: any[] = [
    {
      title: 'TO DO',
      items: [
        {
          image: 'https://www.shutterstock.com/image-vector/elearning-banner-online-education-home-260nw-1694176021.jpg',
          decription: 'This is a test of how the decription will appear in this small little qhite box of words.',
          title: 'Testing',
          assignee: '',
        }
      ]
    },
    {
      title: 'IN PROGRESS',
      items: []
    },
    {
      title: 'DONE',
      items: []
    },
  ];
}
