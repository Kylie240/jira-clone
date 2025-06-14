import { UserDto } from "./userDto";

export class CommentDto {
    commentDto: string;
    commenter: UserDto;
    dateCreated: Date;
    isHoveredOver: boolean;
}