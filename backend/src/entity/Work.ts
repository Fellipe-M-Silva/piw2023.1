import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Author } from "./Author"

@Entity()
export class Work {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 250,
        
    })
    title: string

    @Column({
        nullable: true
    })
    edition: string

    @Column({
        nullable: true
    })
    publisher: string

    //como determinar que o ano precisa ser maior que 0?
    @Column({
        type: "int",
        nullable: true
    })
    publishingYear: number

    //Relacionamentos

    //Possui de *1 a n* autores
    @ManyToMany(() => Author, (author) => author.works, {eager: true})
    authors: Author[]

}