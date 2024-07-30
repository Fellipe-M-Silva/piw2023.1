import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Annotation } from "./Annotation"
import { Profile } from "./Profile"

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

    //Relacionamentos

    //Possui *apenas 1* Perfil
    @ManyToOne(() => Profile, (profile) => profile.user, {eager:true,})
    profile: Profile

    //Possui de *0 a n* fichamentos
    @OneToMany(() => Annotation, (annotation)=> annotation.user)
    annotations: Annotation[]

}