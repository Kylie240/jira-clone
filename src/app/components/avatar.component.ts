import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { UserDto } from "../dtos/userDto";
import { TooltipModule } from "primeng/tooltip";
import { InitialsPipe } from "../pipes/initials.pipe";

@Component({
  selector: 'app-avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TooltipModule,
    InitialsPipe,
  ],
  template: `
  @if (user().userId) {
    <div class="border-circle cursor-pointer bg-blue-500 flex justify-content-center align-items-center" tooltipPosition="bottom" [pTooltip]="displayName() ? user().firstName + ' ' + user().lastName : user().email" style="width: 24px; height: 24px">
        <p class="text-white" style="font-size: 11px;">{{user() | initials}}</p>
    </div>
  } @else {
    <div class="border-circle cursor-pointer bg-gray-300 flex justify-content-center align-items-center" tooltipPosition="bottom" pTooltip="Unassigned" style="width: 24px; height: 24px">
        <i class="fa-regular fa-user"></i>
    </div>
  }
  `
})
export class AvatarComponent {
  user = input.required<UserDto>();
  displayName = input<boolean>();

}