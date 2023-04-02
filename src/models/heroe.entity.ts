import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Heroe {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    alte!: string

}