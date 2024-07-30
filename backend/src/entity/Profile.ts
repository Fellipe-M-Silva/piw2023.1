import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToMany, OneToMany, JoinTable } from "typeorm"
import { Permission } from "./Permission"
import { User } from "./User"

@Entity()
export class Profile
{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column( {
        unique: true
    })
    name: string

    //Relacionamentos

    //Possui de *0 a n* usuários
    @OneToMany(() => User, (user) => user.profile)
    user: User

    //Possui de *0 a n* permissões
    @ManyToMany(() => Permission, (permission) => permission.profiles, {
        eager: true, 
    })
    @JoinTable()    
    permissions: Permission[]

}