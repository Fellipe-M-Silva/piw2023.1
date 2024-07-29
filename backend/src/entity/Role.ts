import { Entity, PrimaryGeneratedColumn, Column, ChildEntity } from "typeorm"

@Entity()
export class Role {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

}