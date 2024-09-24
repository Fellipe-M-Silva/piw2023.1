import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm"
import { Work } from "./Work"

@Entity() export class Author
{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    //Relacionamentos

    //Possui de *1 a n* obras
    // @ManyToMany(() => Work, (work) => work.authors, {
    //     nullable: true
    // })
    // @JoinTable()
    // works: Work[]

}