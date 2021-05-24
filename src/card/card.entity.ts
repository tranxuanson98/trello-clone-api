import { List } from "src/list/list.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Card {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @ManyToOne(() => List, list => list.cards)
    list: List;
}