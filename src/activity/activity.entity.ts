import { ObjectActivity } from "src/objectActivity/object-activity.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, Generated, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => User, user => user.activities)
    user: User

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    date: Date;

    @OneToOne(() => ObjectActivity)
    @JoinColumn()
    objectActivity: ObjectActivity;
}