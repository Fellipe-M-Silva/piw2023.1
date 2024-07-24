import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/user.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const quoteRoutes = Router();

quoteRoutes.post("/quote", bodyParser.json(), Create);
quoteRoutes.get("/quote", List);
quoteRoutes.get("/quote/:id", Find);
quoteRoutes.put("/quote/:id", bodyParser.json(), Update);
quoteRoutes.delete("/quote/:id", Delete);

export default quoteRoutes;