import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";
import { ColumnItemDto } from "../dtos/columnItemDto";

@Component({
  selector: 'app-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TooltipModule,
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
                    <div class="border-round-sm bg-blue-500 flex justify-content-center align-items-center" style="width: 20px; height: 20px">
                        <i class="fa-solid fa-check text-xs"></i>
                    </div>
                    <p class="m-0 text-sm">
                        {{item().title}}
                    </p>
                </div>
                <div pTooltip="Unassigned" tooltipPosition="bottom" class="cursor-pointer border-circle bg-gray-300 flex justify-content-center align-items-center" style="width: 20px; height: 20px">
                    <i class="fa-regular fa-user text-xs"></i>
                </div>
            </div>
        </div>
    </div>
  `
})
export class ItemComponent {
  item = input.required<ColumnItemDto>();
  idx = input.required<number>();
}
