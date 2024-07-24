import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
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

    @Column({
        default: false
    })
    isAdmin: boolean

    @OneToMany(() => Annotation, (annotation)=> annotation.user)
    annotations: Annotation[]
}