import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity()
export class Role {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column( {
        unique: true
    })
    name: string

    // //Criando permissões como booleans????
    // @Column()
    // canCreateUsers: boolean

    // @OneToOne(() => User, (user) => user.role)
    // user: User
}