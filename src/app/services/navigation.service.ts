import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private fullScreenEnabledSource = new BehaviorSubject<boolean>(false);
  fullScreenEnabled$ = this.fullScreenEnabledSource.asObservable();
  private sideNavSource = new BehaviorSubject<boolean>(true);
  sideNavVisible$ = this.sideNavSource.asObservable();

  toggleSideNavbar(display: boolean) {
    this.sideNavSource.next(display);
  }
  
  toggleFullScreen(display: boolean) {
    this.fullScreenEnabledSource.next(!display);
  }
}
