import { ColumnItemDto } from "./columnItemDto";

export class ColumnDto {
    title: string;
    items: ColumnItemDto[];
    constructor(title: string = '', items: ColumnItemDto[] = []) {
        this.title = title; 
        this.items = items; 
    }
    editmode?: boolean = false;
    isHovering?: boolean = false;
    itemLimit?: number;
}