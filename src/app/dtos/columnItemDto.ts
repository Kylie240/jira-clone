export class ColumnItemDto {
    itemId: string;
    image: string; 
    title: string; 
    assignee: string;
    type: number;
    dateCreated: Date;
    priority: number;
    editmode?: boolean;
    isHoveredOver?: boolean;
}