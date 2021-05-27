import { Comments } from "src/comments/comments.entity";
import { List } from "src/list/list.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => Comments, comment => comment.card, {
        cascade: true,
    })
    comments: Comments[];

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
}