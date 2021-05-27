import { Card } from "src/card/card.entity";

export interface Comments {
    id?: string;
    content: string;
    date?: Date
    card: Card 
}