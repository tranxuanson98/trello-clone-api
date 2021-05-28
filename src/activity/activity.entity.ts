import { User } from "src/user/user.entity";
import { Column, Entity, Generated, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    description: string

    @ManyToOne(() => User, user => user.activities)
    user: User

}