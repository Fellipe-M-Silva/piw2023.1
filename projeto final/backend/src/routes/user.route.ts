import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/user.controller";
import bodyParser from "body-parser";
import { userSchema } from "../validators/user.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from "cors";

const userRoutes = Router();

userRoutes.post("/users", cors(), bodyParser.json(), userSchema, validateRequestSchema, Create);

userRoutes.get("/users", cors(), List);

userRoutes.get("/users/:id", cors(), Find);

userRoutes.put("/users/:id", cors(), bodyParser.json(), userSchema, validateRequestSchema, Update);

userRoutes.delete("/users/:id", cors(), Delete);

// userRoutes.post("/cadastro", )
export default userRoutes;