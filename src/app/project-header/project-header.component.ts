import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { ProjectDto } from '../dtos/projectDto';
import { NavigationService } from '../services/navigation.service';
import { NgStyle } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-project-header',
  imports: [
    NgStyle,
    TooltipModule,
  ],
  templateUrl: './project-header.component.html',
  styles: ``
})
export class ProjectHeaderComponent implements OnInit {
  fullscreenEnabled: WritableSignal<boolean> = signal(false);
  projectMenu: WritableSignal<{name: string, icon: string}[]> = signal([null]);
  project = input.required<ProjectDto>();

  constructor ( 
    private navigationService: NavigationService,
   ) {
    this.navigationService.fullScreenEnabled$.subscribe((data: boolean) => {
      this.fullscreenEnabled.set(data);
    });
  }

  ngOnInit(): void {
    this.projectMenu.set(
        [
          {
            name: 'Summary',
            icon: 'fa-solid fa-globe',
          },
          {
            name: 'Timeline',
            icon: 'fa-solid fa-bars-staggered',
          },
          {
            name: 'Board',
            icon: 'fa-solid fa-table-columns',
          },
          {
            name: 'Calendar',
            icon: 'fa-regular fa-calendar',
          },
          {
            name: 'List',
            icon: 'fa-solid fa-table-list',
          },
          {
            name: 'Forms',
            icon: 'fa-solid fa-list',
          },
          {
            name: 'Goals',
            icon: 'fa-solid fa-bullseye',
          },
          {
            name: 'Code',
            icon: 'fa-solid fa-code',
          },
          {
            name: 'All work',
            icon: 'fa-solid fa-check-to-slot',
          },
          {
            name: 'Archived',
            icon: 'fa-solid fa-box-archive',
          },
          {
            name: 'Pages',
            icon: 'fa-regular fa-file',
          },
          {
            name: 'Shortcuts',
            icon: 'fa-solid fa-link',
          },
        ]
      )
  }

  toggleFullScreen() {
    this.navigationService.toggleFullScreen(this.fullscreenEnabled());
  }
}
