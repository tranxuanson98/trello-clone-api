import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
enum typeActivity {
    board,
    card,
    list,
    comment
}
@Entity()
export class ObjectActivity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    typeActivity: typeActivity

    @Column()
    typeId: string

}