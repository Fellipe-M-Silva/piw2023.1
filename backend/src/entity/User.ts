import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Annotation } from "./Annotation"
import { Role } from "./Role"

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
    email: string

    @Column()
    password: string

    @OneToMany(() => Annotation, (annotation)=> annotation.user)
    annotations: Annotation[]

    // @OneToOne(() => Role, (role) => role.user)
    // @JoinColumn()
    // role: Role
}