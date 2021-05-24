import { List } from "src/list/list.entity";

export interface Broad {
    id?: string;
    name: string;
    status?: number;
    lists?: List
}