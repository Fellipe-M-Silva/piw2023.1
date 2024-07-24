import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/user.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const userRoutes = Router();

userRoutes.post("/user", bodyParser.json(), Create);
userRoutes.get("/user", List);
userRoutes.get("/user/:id", Find);
userRoutes.put("/user/:id", bodyParser.json(), Update);
userRoutes.delete("/user/:id", Delete);

export default userRoutes;