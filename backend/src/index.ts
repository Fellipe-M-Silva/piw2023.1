import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import path from "path";
import { AppDataSource } from "./data-source";
import userRoutes from "./routes/user.route";


const server = express();
dotenv.config();
server.use(userRoutes);

//Criar o banco e gerar as tabelas
AppDataSource.initialize().catch(error => {
    console.log(error);
});

const host = process.env.HOST_PORT || "localhost";
const port = process.env.BACK_PORT || 5000;

server.get("/", (req, res) =>{
    // res.sendFile(path.join(__dirname, "/projeto/index.html"));
    res.send("Servidor funcionando ;)")
})

server.listen(port, ()=> {
    console.log(`Servidor está rodando nos trinques em http://${host}:${port} :)`)
})

server.use(express.static(path.join(__dirname,'public')));
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname,'views'));
server.get("/", (req, res) =>{
    res.render('index')
});