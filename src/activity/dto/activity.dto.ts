import { User } from "src/user/user.entity";

export class CreateActivityDto {
    readonly id: string;
    readonly description: string;
    user: User;   
}