import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne, OneToOne } from "typeorm"
import { Quote } from "./Quote"
import { User } from "./User"
import { Work } from "./Work"

@Entity()
export class Annotation
{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        default: true
    })
    isPublic: boolean

    //Relacionamentos

    //Possuído por *Apenas 1* usuário
    @ManyToOne(() => User, (user) => user.annotations)
    user: User

    //Possui *apenas 1* obra
    @OneToOne(() => Work, { eager:true,})
    @JoinColumn()
    work: Work

    //Possui de *0 a N* citações
    @OneToMany(() => Quote, (quote) => quote.annotation, {eager:true})
    quotes: Quote[]
    
}