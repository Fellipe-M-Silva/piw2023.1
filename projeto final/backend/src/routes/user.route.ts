import { Router } from "express";
import { create, list, find, update, remove } from "../controllers/user.controller";
import bodyParser from "body-parser";
import { putUserSchema, postUserSchema } from "../validators/user.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import { authenticateJWT } from "../middleware/authMiddleware";

const userRoutes = Router();

userRoutes.post("/users", bodyParser.json(),authenticateJWT, postUserSchema, validateRequestSchema, create);

userRoutes.get("/users", authenticateJWT, list);

userRoutes.get("/users/:id", authenticateJWT, find);

userRoutes.put("/users/:id", bodyParser.json(), putUserSchema, validateRequestSchema, update);

userRoutes.delete("/users/:id", authenticateJWT, remove);

export default userRoutes;