import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm"
import { Work } from "./Work"
import { Quote } from "./Quote"
import { User } from "./User"

@Entity()
export class Annotation {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        default: false
    })
    isPublic: boolean

    @OneToOne(() => Work)
    @JoinColumn()
    work: Work

    @OneToMany(() => Quote, (quote) => quote.annotation)
    quotes: Quote[]

    @ManyToOne(() => User, (user) => user.annotations)
    user: User
}