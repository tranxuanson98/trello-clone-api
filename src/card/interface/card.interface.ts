import { List } from "src/list/list.entity";

export interface Card {
    id?: string;
    name: string;
    description?: string;
    date?: Date
    list: List 
}