import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/user.controller";
import bodyParser from "body-parser";
import { userSchema } from "../validators/user.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from "cors";
import { authenticateJWT } from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post("/users", bodyParser.json(), authenticateJWT, userSchema, validateRequestSchema, Create);

userRoutes.get("/users", List);

userRoutes.get("/users/:id", Find);

userRoutes.put("/users/:id", bodyParser.json(), userSchema, validateRequestSchema, Update);

userRoutes.delete("/users/:id", Delete);

// userRoutes.post("/cadastro", )
export default userRoutes;