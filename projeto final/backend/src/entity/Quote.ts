import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Annotation } from "./Annotation"
import { User } from "./User"

@Entity()
export class Quote {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "text"
    })
    text: string

    @Column({
        nullable: true
    })
    startingPage: string

    @Column({
        nullable: true
    })
    endingPage: string

    @Column({
        nullable: true
    })
    note: string

    @Column()
    creatorUsername: string

    // Relacionamentos

    //Pertence a *apenas 1* fichamento
    @ManyToOne(() => Annotation, (annotation) => annotation.quotes)
    annotation: Annotation

    //Cadastrador por 1 usuário 
    // @OneToOne(() => User)
    // @JoinColumn()
    // user: User

}