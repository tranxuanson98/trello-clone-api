import { List } from 'src/list/list.entity';
import { User } from 'src/user/user.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

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

    @ManyToMany(() => User) 
    @JoinTable()
    users: User[];
}