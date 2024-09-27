import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Quote } from "./Quote"
import { User } from "./User"
@Entity()
export class Annotation
{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        default: true
    })
    isPublic: boolean

    @Column({
        type: "varchar",
        length: 250,
        
    })
    workTitle: string

    @Column()
    workAuthors: string

    @Column()
    creatorUsername: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    //Relacionamentos

    //Possuído por *Apenas 1* usuário
    @ManyToOne(() => User, (user) => user.annotations)
    user: User

    //Possui de *0 a N* citações
    @OneToMany(() => Quote, (quote) => quote.annotation)
    quotes: Quote[]
    
}