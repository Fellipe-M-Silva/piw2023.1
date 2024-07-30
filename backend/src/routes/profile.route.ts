import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/profile.controller";
import bodyParser from "body-parser";

//criando rotas pra cada entidade :o
const profileRoutes = Router();

profileRoutes.post("/profile", bodyParser.json(), Create);
profileRoutes.get("/profile", List);
profileRoutes.get("/profile/:id", Find);
profileRoutes.put("/profile/:id", bodyParser.json(), Update);
profileRoutes.delete("/profile/:id", Delete);

export default profileRoutes;