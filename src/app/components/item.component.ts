import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";
import { ColumnItemDto } from "../dtos/columnItemDto";
import { TaskIconPipe } from "../pipes/taskIcon.pipe";
import { TaskColorPipe } from "../pipes/taskColor.pipe";
import { AvatarComponent } from "./avatar.component";

@Component({
  selector: 'app-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TooltipModule,
    TaskIconPipe,
    TaskColorPipe,
    AvatarComponent,
  ],
template: `
    <div class="flex flex-column cursor-pointer p-1">
        @if(item().image) {
            <div>
                <img style="height: 120px; width: 100%; object-fit: cover;" src="{{item().image}}" alt="">
            </div>
        }
        <div class="flex flex-column bg-white p-2 gap-2">
            <p class="m-0 text-xs line-height-3">
                {{item().title}}
            </p>
            <div class="flex justify-content-between">
                <div class="flex align-items-center gap-1">
                    <div class="border-round-sm  flex justify-content-center align-items-center" style="width: 20px; height: 20px; background-color : {{item().taskType | taskColor}}">
                        <i class="{{item().taskType | taskIcon}} text-xs"></i>
                    </div>
                    <p class="m-0 text-sm">
                        {{item().title}}
                    </p>
                </div>
                <app-avatar [userId]="item().assignee" />
            </div>
        </div>
    </div>
  `
})
export class ItemComponent {
  item = input.required<ColumnItemDto>();
  idx = input.required<number>();
}
