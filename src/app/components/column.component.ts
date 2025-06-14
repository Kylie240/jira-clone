import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";
import { ColumnDto } from "../dtos/columnDto";
import { ItemComponent } from "./item.component";
import { ProjectService } from "../services/project.service";

@Component({
  selector: 'app-column',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TooltipModule,
    ItemComponent,
  ],
  template: `
  <div class="flex flex-column bg-gray-100 border-round-sm" style="width: 250px; min-height: 100%;" (mouseenter)="column().isHovering = true" (mouseleave)="column().isHovering = false">
    <div class="flex px-3 relative  py-2 align-items-center justify-content-between" style="cursor: grab;">
        <div class="flex align-items-center gap-1">
            <p class="m-0 text-xs">{{column().title}}</p>
            <div class="bg-gray-300 px-2 border-round-sm">
                <p class="m-0 text-sm">{{idx() + 1}}</p>
            </div>
        </div>
        @if (column().isHovering) {
            <div class="hover:bg-gray-200 cursor-pointer px-2 py-1 border-round-sm" (click)="column().editmode = !column().editmode">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
        }
        @if (column().editmode) {
            <div class="bg-white absolute py-1" style="width: 190px;">
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="renameColumn('test')">
                    <p class="m-0">Rename</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="moveColumn(true)">
                    <p class="m-0">Move column left</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="moveColumn(false)">
                    <p class="m-0">Move column right</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="setColumnLimit(4)">
                    <p class="m-0">Set item limit</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="deleteColumn()">
                    <p class="m-0">Delete</p>
                </div>
            </div>
        }
    </div>
    @for (item of column().items; track $index) {
        <app-item [item]="item" [idx]="$index"/>
    }
</div>
  `
})
export class ColumnComponent {
  column = input.required<ColumnDto>();
  idx = input.required<number>();
  projectId = input.required<string>();

  constructor (
    private projectService: ProjectService,
    ) {}

  renameColumn(value: string) {
    this.projectService.renameColumn(this.projectId(), this.idx(), value);
  }

  moveColumn(moveLeft: boolean) {
    this.projectService.moveColumn(this.projectId(), this.idx(), moveLeft);
  }

  setColumnLimit(limit: number) {
    this.projectService.setColumnLimit(this.projectId(), this.idx(), limit);
  }

  deleteColumn() {
    this.projectService.deleteColumn(this.projectId(), this.idx());
  }

  addColumnItem() {
    this.projectService.addColumnItem(this.projectId(), this.idx());
  }
}
