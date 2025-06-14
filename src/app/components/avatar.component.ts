import { Component, input } from "@angular/core";
import { UserDto } from "../dtos/userDto";
import { TooltipModule } from "primeng/tooltip";
import { InitialsPipe } from "../pipes/initials.pipe";

@Component({
  selector: 'app-avatar',
  imports: [
    TooltipModule,
    InitialsPipe,
  ],
  template: `
    <div class="border-circle cursor-pointer flex justify-content-center align-items-center" tooltipPosition="bottom" pTooltip="{{user().email}}" style="width: 24px; height: 24px">
        <p class="text-white" style="font-size: 11px;">{{user() | initials}}</p>
    </div>
  `,
  styles: `
  
  `
})
export class AvatarComponent {
  user = input.required<UserDto>();

  constructor () {
  }
}