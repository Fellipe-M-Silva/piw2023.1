import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Auth } from "typeorm"
import { Author } from "./Author"

@Entity()
export class Work {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: "varchar",
        length: 250,
        
    })
    name: string

    @Column()
    edition: string

    @Column()
    publisher: string

    //como determinar que o ano precisa ser maior que 0?
    @Column()
    publishingYear: number

    @ManyToMany(() => Author, (author) => author.works)
    @JoinTable()
    authors: Author[]
}