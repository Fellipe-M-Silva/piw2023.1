import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/user.controller";
import bodyParser from "body-parser";
import { userSchema } from "../validators/user.validator";
import { validateRequestSchema } from "../validators/validationFunction";

const userRoutes = Router();

userRoutes.post("/user", bodyParser.json(), userSchema, validateRequestSchema, Create);

userRoutes.get("/users", List);

userRoutes.get("/user/:id", Find);

userRoutes.put("/user/:id", bodyParser.json(), userSchema, validateRequestSchema, Update);

userRoutes.delete("/user/:id", Delete);

// userRoutes.post("/cadastro", )

export default userRoutes;