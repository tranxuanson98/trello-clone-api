import { User } from "src/user/user.entity";

export class CreateCommentDto {
    readonly id: string;
    readonly content: string;
    readonly date: Date;
    readonly cardId: string;
    user: User
}