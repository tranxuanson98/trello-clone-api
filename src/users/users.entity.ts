import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    age: number;
}