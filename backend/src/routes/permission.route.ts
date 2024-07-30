import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/permission.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const permissionRoutes = Router();

permissionRoutes.post("/permission", bodyParser.json(), Create);
permissionRoutes.get("/permission", List);
permissionRoutes.get("/permission/:id", Find);
permissionRoutes.put("/permission/:id", bodyParser.json(), Update);
permissionRoutes.delete("/permission/:id", Delete);

export default permissionRoutes;