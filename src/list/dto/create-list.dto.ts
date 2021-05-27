import { User } from "src/user/user.entity";

export class CreateListDto {
    readonly id: string;
    readonly name: string;
    readonly boardId: string;   
    user: User;   
}