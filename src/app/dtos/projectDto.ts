import { ColumnDto } from "./columnDto";
import { TaskTypeDto } from "./taskTypeDto";

export class ProjectDto {
    projectId: string;
    name: string;
    taskTypes: TaskTypeDto[];
    columns: ColumnDto[];
}