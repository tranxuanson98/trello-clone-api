import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Board } from 'src/board/board.entity';
import {Card} from 'src/card/card.entity'
@Entity()
export class List {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Board, board => board.lists)
    board: Board;

    @OneToMany(() => Card, card => card.list, {
        cascade: true,
    })
    cards: Card[];
}