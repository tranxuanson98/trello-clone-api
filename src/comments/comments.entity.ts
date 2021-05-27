import { Card } from "src/card/card.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @ManyToOne(() => Card, card => card.comments)
    card: Card;

    @ManyToMany(() => User) 
    @JoinTable()
    users: User[];
}
