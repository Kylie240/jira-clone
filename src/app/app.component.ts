import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `
  <div class="h-screen">
    <app-layout />
  </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'jira-clone';
}
