import { User } from "src/user/user.entity";

export class CreateBoardDto {
    readonly id: string;
    readonly name: string;
    readonly status: number;
    user: User;
}