export class ColumnItemDto {
    itemId: string;
    image: string; 
    title: string; 
    assignee: string;
    taskType: number = 1;
    dateCreated: Date;
    priority: number;
    editmode?: boolean;
    isHoveredOver?: boolean;
}