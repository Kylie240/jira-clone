import { Injectable } from '@angular/core';
import { projects } from '../data/projectData';
import { ColumnDto } from '../dtos/columnDto';
import { ColumnItemDto } from '../dtos/columnItemDto';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    // readonly projects = projects;

  getProject(projectId: string) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        return projects[index];
    }
    return null;
  }

  addNewColumn(projectId: string, title: string) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        projects[index].columns.push(new ColumnDto(title));
    }
  }

  addColumnItem(projectId: string, columnIdx: number) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        projects[index].columns[columnIdx].items.push(new ColumnItemDto());
    }
  }

  renameColumn(projectId: string, columnIdx: number, value: string) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        projects[index].columns[columnIdx].title = value;
    }
  }

  moveColumn(projectId: string, columnIdx: number, moveLeft: boolean) {
    const index = this.getProjectReference(projectId);
    if (index === -1) { return; };

    const columns = structuredClone(projects[index].columns);
    if ((moveLeft && columnIdx === 0) || (!moveLeft && columnIdx === columns.length - 1) || columns.length === 1) {
      return;
    }

    console.log(columns);
    const columnToMove = structuredClone(columns[columnIdx]);
    this.deleteColumn(projectId, columnIdx);
    const direction = moveLeft ? -1 : 1;
    projects[index].columns.splice(columnIdx + direction, 0, columnToMove)
  }

  setColumnLimit(projectId: string, columnIdx: number, limit: number) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        projects[index].columns[columnIdx].itemLimit = limit;
    }
  }

  deleteColumn(projectId: string, columnIdx: number) {
    const index = this.getProjectReference(projectId);
    if (index !== -1) {
        const filteredArray = projects[index].columns.filter((_, index) => index != columnIdx);
        projects[index].columns = structuredClone(filteredArray);
    }
  }

  private getProjectReference(projectId: string): number {
    return projects.findIndex(p => p.projectId === projectId);
  }
}
