import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/user.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const annotationRoutes = Router();

annotationRoutes.post("/annotation", bodyParser.json(), Create);
annotationRoutes.get("/annotation", List);
annotationRoutes.get("/annotation/:id", Find);
annotationRoutes.put("/annotation/:id", bodyParser.json(), Update);
annotationRoutes.delete("/annotation/:id", Delete);

export default annotationRoutes;