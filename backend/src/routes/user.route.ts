import { Router } from "express";
import userController from "../controllers/user.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const userRoutes = Router();

userRoutes.post("/user", bodyParser.json(), userController.Create);
//retorna todos os usuários
userRoutes.get("/user", userController.List);
userRoutes.get("/user/:id", userController.Find);
userRoutes.put("/user/:id", bodyParser.json(), userController.Update);
userRoutes.delete("/user/:id", userController.Delete);

export default userRoutes;