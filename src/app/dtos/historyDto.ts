import { UserDto } from "./userDto";

export class HistoryDto {
    historyId: string;
    commenter: UserDto;
    dateModified: Date;
    action: number;
    itemModified: string;
}