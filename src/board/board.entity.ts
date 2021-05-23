import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ default: 0 })
    status: number;
}