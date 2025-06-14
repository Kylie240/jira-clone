import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../dtos/userDto';
import { users } from '../data/userData';
import { projects } from '../data/projectData';
import { ColumnDto } from '../dtos/columnDto';
import { ColumnItemDto } from '../dtos/columnItemDto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    readonly projects = projects;

  getProject(projectId: string) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        return this.projects[index];
    }
    return null;
  }

  addNewColumn(projectId: string) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        this.projects[index].columns.push(new ColumnDto());
    }
  }

  addColumnItem(projectId: string, columnIdx: number) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        this.projects[index].columns[columnIdx].items.push(new ColumnItemDto());
    }
  }

  renameColumn(projectId: string, columnIdx: number, value: string) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        this.projects[index].columns[columnIdx].title = value;
    }
  }

  moveColumn(projectId: string, columnIdx: number, moveLeft: boolean) {
    const index = this.getProjectReference(projectId);
    if (!index) { return; };

    const column = this.projects[index].columns;
    if ((moveLeft && index === 0) || (!moveLeft && index === column.length - 1) || column.length === 1) {
      return;
    }
    const columnToMove = column[columnIdx];
    const direction = moveLeft ? -1 : 1;
    column.slice(columnIdx, 1);
    column.splice(columnIdx + direction, 0, columnToMove);
  }

  setColumnLimit(projectId: string, columnIdx: number, limit: number) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        this.projects[index].columns[columnIdx].itemLimit = limit;
    }
  }

  deleteColumn(projectId: string, columnIdx: number) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        this.projects[index].columns.slice(columnIdx, 1);
    }
  }

  private getProjectReference(projectId: string): number {
    return this.projects.findIndex(p => p.projectId === projectId);
  }
}
