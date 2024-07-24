import "reflect-metadata"
import { DataSource } from "typeorm"
import { Annotation } from "./entity/Annotation"
import { Author } from "./entity/Author"
import { Quote } from "./entity/Quote"
import { Role } from "./entity/Role"
import { User } from "./entity/User"
import { Work } from "./entity/Work"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/db.sqlite3",
    synchronize: true,
    logging: false,
    //colocar entidades depois de criar elas na pasta entity
    entities: [ Annotation, Author, Quote, Role, User, Work ],
    migrations: [],
    subscribers: [],
})
