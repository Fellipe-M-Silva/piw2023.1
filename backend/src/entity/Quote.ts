import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Annotation } from "./Annotation"

@Entity()
export class Quote {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "text"
    })
    text: string

    @Column()
    startingPage: number

    //é assim que digo que o default é a mesma página?
    @Column({
        default: "startingPage"
    })
    endingPage: number

    //como determinar que o ano precisa ser maior que 0?
    @Column()
    note: string

    @ManyToOne(() => Annotation, (annotation) => annotation.quotes)
    annotation: Annotation

}