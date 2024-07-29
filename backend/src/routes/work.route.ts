import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/work.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const workRoutes = Router();

workRoutes.post("/work", bodyParser.json(), Create);
workRoutes.get("/work", List);
workRoutes.get("/work/:id", Find);
workRoutes.put("/work/:id", bodyParser.json(), Update);
workRoutes.delete("/work/:id", Delete);

export default workRoutes;