import { List } from 'src/list/list.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: 0 })
    status: number;

    @OneToMany(() => List, list => list.board, {
        cascade: true,
    })
    lists: List[];
}