import { ChangeDetectionStrategy, Component, input, signal, WritableSignal } from "@angular/core";
import { TooltipModule } from "primeng/tooltip";
import { ColumnDto } from "../dtos/columnDto";
import { ItemComponent } from "./item.component";
import { ProjectService } from "../services/project.service";
import { ButtonModule } from "primeng/button";
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from "@angular/forms";
import { ColumnItemDto } from "../dtos/columnItemDto";
import { AvatarComponent } from "./avatar.component";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'app-column',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TooltipModule,
    ItemComponent,
    ButtonModule,
    DialogModule,
    FormsModule,
    TooltipModule,
    AvatarComponent,
    NgStyle,
  ],
  template: `
  <div class="flex flex-column bg-gray-100 border-round-sm" style="width: 250px; min-height: 100%;" (mouseenter)="column().isHovering = true" (mouseleave)="column().isHovering = false" [ngStyle]="{'border' : column().itemLimit === column().items.length ? '3px solid blue' : ''}">
    <div class="flex px-3 relative align-items-center justify-content-between" style="cursor: grab;">
        <div class="flex align-items-center w-full justify-content-between" style="min-height: 48px">
            @if (!renameEnabled) {    
            <div class="flex justify-content-between w-full align-items-center">
                <div class="flex gap-2 align-items-center">
                    <p class="m-0 text-xs">{{column().title}}</p>
                    <div class="bg-gray-300 px-2 border-round-sm">
                        <p class="m-0 text-sm">{{idx() + 1}}</p>
                    </div>
                </div>
                @if (column().isHovering) {
                    <div class="hover:bg-gray-200 cursor-pointer px-2 py-1 border-round-sm" pTooltip="More actions" tooltipPosition="bottom" (click)="column().editmode = !column().editmode">
                        <i class="fa-solid fa-ellipsis"></i>
                    </div>
                }
            </div>
            } @else {
                <div class="flex flex-column gap-1 w-full mt-3 mb-2">
                    <input type="text w-full" pInputText [(ngModel)]="newColumnName" style="height: 30px" [placeholder]="column().title"/>
                    <div class="flex gap-1 justify-content-start">
                        <div style="height: 32px; width: 32px;" (click)="renameColumn()" class="flex shadow-1 align-items-center justify-content-center cursor-pointer hover:bg-gray-200 align-items-center p-1 border-1 border-gray-400 border-round-sm">
                            <i class="fa-solid fa-check fa-sm"></i>
                        </div>
                        <div style="height: 32px; width: 32px;" (click)="renameEnabled = false; newColumnName = null" class="flex shadow-1 align-items-center justify-content-center cursor-pointer hover:bg-gray-200 align-items-center p-1 border-1 border-gray-400 border-round-sm">
                            <i class="fa-solid fa-x fa-sm"></i>
                        </div>
                    </div>
                </div>
            }
        </div>
        @if (column().editmode) {
            <div class="bg-white absolute py-1 shadow-1" style="width: 190px; right: 5px; top: 40px">
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="this.column().editmode = false; this.renameEnabled = true">
                    <p class="m-0">Rename</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="this.column().editmode = false; moveColumn(true)">
                    <p class="m-0">Move column left</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="this.column().editmode = false; moveColumn(false)">
                    <p class="m-0">Move column right</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="toggleLimitOverlay()">
                    <p class="m-0">Set item limit</p>
                </div>
                <div class="flex cursor-pointer align-content-center hover:bg-gray-200 p-2" (click)="this.column().editmode = false; deleteColumn()">
                    <p class="m-0">Delete</p>
                </div>
            </div>
        }
    </div>
    @if (column().isHovering && !newItemEnabled) {
        <div class="flex align-items-center gap-1 mx-1 hover:bg-gray-200 cursor-pointer px-2 py-3 border-round-sm" style="height: 34px;" (click)="toggleItemCreation()">
            <i class="fa-solid fa-plus"></i>
            <p>Create</p>
        </div>
    }
    @if (newItemEnabled) {
        <div class="flex flex-column justify-content-between bg-white gap-1 pb-2 px-2" style="border: 3px solid blue">
            <div>
                <input type="text" class="w-full" pInputText [(ngModel)]="newItemToAdd.title" style="height: 30px; border: none" placeholder="What needs to be done?"/>
            </div>
            <div class="flex justify-content-between">
                <div class="flex gap-1">
                    <div style="height: 28px; width: 28px;" pTooltip="Task" tooltipPosition="bottom" (click)="renameEnabled = false; newColumnName = null" class="flex align-items-center justify-content-center cursor-pointer hover:bg-gray-200 align-items-center p-1 border-round-sm">
                        <i class="fa-solid fa-calendar fa-sm"></i>
                    </div>
                    <div style="height: 28px; width: 28px;" pTooltip="Due date" tooltipPosition="bottom" (click)="renameEnabled = false; newColumnName = null" class="flex align-items-center justify-content-center cursor-pointer hover:bg-gray-200 align-items-center p-1 border-round-sm">
                        <i class="fa-solid fa-calendar fa-sm"></i>
                    </div>
                    <div style="height: 28px; width: 28px;" (click)="renameEnabled = false; newColumnName = null" class="flex align-items-center justify-content-center cursor-pointer hover:bg-gray-200 align-items-center p-1 border-round-sm">
                        <app-avatar />
                    </div>
                </div>
                <div style="height: 28px; width: 28px;" (click)="addColumnItem()" class="flex align-items-center justify-content-center cursor-pointer hover:bg-gray-200 align-items-center p-1 border-round-sm">
                    <i class="fa-solid fa-check fa-sm"></i>
                </div>
            </div>
        </div>
    }
    @for (item of column().items; track $index) {
        <app-item [item]="item" [idx]="$index"/>
    }
    <p-dialog header="Column limit" [modal]="true" [(visible)]="showLimitOverlay" [style]="{ width: '400px' }" >
        <ng-template pTemplate="content">
            <p class="mb-3"> We'll highlight this column if the number of work items in it passes this limit. </p>
            <p class="font-bold mb-1"> Maximum work items </p>
            <input type="number" pInputText [(ngModel)]="newLimitValue" style="width: 184px; height: 30px" [placeholder]="column().itemLimit ? 'Current limit: ' + column().itemLimit : 'No limit set'"/>
        </ng-template>
        <ng-template pTemplate="footer">
            <p-button label="Cancel" [text]="true" severity="secondary" (onClick)="showLimitOverlay = false" />
            <p-button label="Save" severity="primary" (onClick)="setColumnLimit()" />
        </ng-template>
    </p-dialog>
</div>
  `
})
export class ColumnComponent {
  column = input.required<ColumnDto>();
  idx = input.required<number>();
  projectId = input.required<string>();
  showLimitOverlay: boolean = false;
  newColumnName: string;
  newLimitValue: number;
  renameEnabled: boolean;
  newItemEnabled: boolean;
  newItemToAdd: ColumnItemDto = new ColumnItemDto();

  constructor (
    private projectService: ProjectService,
    ) {}

  renameColumn() {
    this.renameEnabled = false;
    this.projectService.renameColumn(this.projectId(), this.idx(), this.newColumnName);
  }

  moveColumn(moveLeft: boolean) {
    this.projectService.moveColumn(this.projectId(), this.idx(), moveLeft);
  }

  setColumnLimit() {
    this.showLimitOverlay = false
    if (!this.newLimitValue) { return; }
    this.projectService.setColumnLimit(this.projectId(), this.idx(), this.newLimitValue);
  }

  deleteColumn() {
    this.projectService.deleteColumn(this.projectId(), this.idx());
  }

  addColumnItem() {
    this.projectService.addColumnItem(this.projectId(), this.idx());
  }

  toggleLimitOverlay() {
    this.column().editmode = false;
    this.showLimitOverlay = true;
  }

  toggleItemCreation() {
    this.newItemEnabled = true;
  }
}
