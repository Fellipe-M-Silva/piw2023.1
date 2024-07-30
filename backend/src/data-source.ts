import "reflect-metadata"
import { DataSource } from "typeorm"
import { Annotation } from "./entity/Annotation"
import { Author } from "./entity/Author"
import { Quote } from "./entity/Quote"
import { Profile } from "./entity/Profile"
import { User } from "./entity/User"
import { Work } from "./entity/Work"
import { Permission } from "./entity/Permission"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/db.sqlite3",
    synchronize: true,
    logging: false,
    //colocar entidades depois de criar elas na pasta entity
    entities: [ Annotation, Author, Permission, Profile, Quote, User, Work ],
    migrations: [],
    subscribers: [],
})
