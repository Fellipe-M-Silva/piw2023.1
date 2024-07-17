import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "src/database/db.sqlite3",
    synchronize: true,
    logging: false,
    //colocar entidades depois de criar elas na pasta entity
    entities: [User],
    migrations: [],
    subscribers: [],
})
