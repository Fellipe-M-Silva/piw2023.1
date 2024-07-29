import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ChildEntity } from "typeorm"
import { Annotation } from "./Annotation"

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 50,
        
    })
    name: string

    @Column()
    profile: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Annotation, (annotation)=> annotation.user)
    annotations: Annotation[]
}