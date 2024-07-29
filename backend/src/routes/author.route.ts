import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/author.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const authorRoutes = Router();

authorRoutes.post("/author", bodyParser.json(), Create);
authorRoutes.get("/author", List);
authorRoutes.get("/author/:id", Find);
authorRoutes.put("/author/:id", bodyParser.json(), Update);
authorRoutes.delete("/author/:id", Delete);

export default authorRoutes;