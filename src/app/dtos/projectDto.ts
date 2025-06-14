import { ColumnDto } from "./columnDto";

export class ProjectDto {
    projectId: string;
    name: string;
    columns: ColumnDto[];
}