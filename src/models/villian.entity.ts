import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class villian {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    alte!: string

}