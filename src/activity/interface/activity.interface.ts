import { User } from "src/user/user.entity";

export interface Activity {
    id?: string;
    description: string;
    user?: User;
}