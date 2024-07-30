import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Annotation } from "./Annotation"

@Entity()
export class User 
{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 50,
        
    })
    name: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @Column({default:false})
    isAdmin: boolean

    @Column({default:false})
    isSuperAdmin: boolean

    //Possui de *0 a n* fichamentos
    @OneToMany(() => Annotation, (annotation)=> annotation.user)
    annotations: Annotation[]

}