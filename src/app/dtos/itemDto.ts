import { ColumnItemDto } from "./columnItemDto";
import { CommentDto } from "./commentDto";
import { HistoryDto } from "./historyDto";

export class ItemDto extends ColumnItemDto {
    status: number;
    description: string;
    attachments: any[];
    dueDate: Date;
    tags: string[];
    comments: CommentDto[];
    history: HistoryDto[];
}