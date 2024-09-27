import "reflect-metadata"
import { DataSource } from "typeorm"
import { Annotation } from "./entity/Annotation"
import { Quote } from "./entity/Quote"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/db.sqlite3",
    synchronize: true,
    logging: false,
    entities: [ Annotation, Quote, User ],
    migrations: [],
    subscribers: [],
})
