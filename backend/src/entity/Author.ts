import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable} from "typeorm"
import { Work } from "./Work"

@Entity()
export class Author {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true
    })
    name: string

    @ManyToMany(() => Work, (work) => work.authors, {
        nullable: true
    })
    works: Work[]

}