import express from "express";
import dotenv from "dotenv";
import path from "path";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.route";
import "reflect-metadata";

const server = express();
server.use(userRoutes);
dotenv.config();
//Criar o banco e gerar as tabelas
AppDataSource.initialize().catch(error => {
    console.log(error);
});

const port = process.env.BACK_PORT || 5000;

server.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/projeto/index.html"));
})

server.listen(port, ()=> {
    console.log("Servidor está rodando no talo")
})