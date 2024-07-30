import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm"
import { Profile } from "./Profile"


@Entity()
export class Permission
{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column( {
        unique: true
    })
    name: string

    @Column({ default: false})
    isActive: boolean

    @ManyToMany(() => Profile, (profile) => profile.permissions)
    profiles: Profile[]
}