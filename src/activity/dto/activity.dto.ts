import { ObjectActivity } from "src/objectActivity/object-activity.entity";
import { User } from "src/user/user.entity";

export class CreateActivityDto {
    readonly id: string;
    description: string;
    user: User;
    objectActivity: ObjectActivity;
}