import { ChangeDetectionStrategy, Component, input, signal, WritableSignal } from "@angular/core";
import { UserDto } from "../dtos/userDto";
import { TooltipModule } from "primeng/tooltip";
import { InitialsPipe } from "../pipes/initials.pipe";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TooltipModule,
    InitialsPipe,
  ],
  template: `
  @if (user() && user()?.userId) {
    <div class="border-circle cursor-pointer bg-blue-500 flex justify-content-center align-items-center" tooltipPosition="bottom" [pTooltip]="displayName() ? user().firstName + ' ' + user().lastName : user().email" style="width: 24px; height: 24px">
        <p class="text-white" style="font-size: 11px;">{{user() | initials}}</p>
    </div>
  } @else if (userFromId()) {
    <div class="border-circle cursor-pointer bg-blue-500 flex justify-content-center align-items-center" tooltipPosition="bottom" [pTooltip]="displayName() ? userFromId().firstName + ' ' + userFromId().lastName : userFromId().email" style="width: 24px; height: 24px">
        <p class="text-white" style="font-size: 11px;">{{userFromId() | initials}}</p>
    </div>
  } @else () {
    <div class="border-circle cursor-pointer bg-gray-300 flex justify-content-center align-items-center" tooltipPosition="bottom" pTooltip="Unassigned" style="width: 24px; height: 24px">
        <i class="fa-regular fa-user"></i>
    </div>
  }
  `
})
export class AvatarComponent {
  user = input<UserDto>();
  displayName = input<boolean>();
  userId = input<string>(null);
  userFromId: WritableSignal<UserDto> = signal(null);

  constructor (
    private userService: UserService,
  ) {
    this.getUser();
  }

  getUser() {
    if (this.userId() && !this.user()) {
      this.userFromId.set(this.userService.getUserById(this.userId()));
    }
  }
}