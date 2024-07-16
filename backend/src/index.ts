import express from "express";
import dotenv from "dotenv";
import path from "path";

const server = express();
dotenv.config();

const port = process.env.BACK_PORT || 5000;

server.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "/projeto/index.html"));
})

server.listen(port, ()=> {
    console.log("Servidor está rodando no talo")
})