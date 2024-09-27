import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import annotationRoutes from "./routes/annotation.route";
import quoteRoutes from "./routes/quote.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/authentication.route";

const server = express();
server.use(cors());
dotenv.config();
server.use(annotationRoutes);
server.use(quoteRoutes);
server.use(userRoutes);
server.use(authRoutes);
server.use(express.json());

AppDataSource.initialize().catch(error => {
    console.log(error);
});

const host = process.env.HOST_PORT || "localhost";
const port = process.env.BACK_PORT || 5000;


server.get("/", (req, res) =>{
    res.send("Servidor funcionando ;)")
})

server.listen(port, ()=> {
    console.log(`Servidor está rodando nos trinques em http://${host}:${port} :)`)
})

// server.use(express.static(path.join(__dirname,'public')));
// server.set('view engine', 'ejs');
// server.set('views', path.join(__dirname,'views'));
// server.get("/", (req, res) =>{
//     res.render('index')
// });