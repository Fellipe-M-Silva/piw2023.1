import { Router } from "express";
import { create, list, find, update, remove } from "../controllers/user.controller";
import bodyParser from "body-parser";
import { putUserSchema, postUserSchema } from "../validators/user.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import { authenticateJWT } from "../middleware/authMiddleware";

const userRoutes = Router();
// userRoutes.use(authenticateJWT)

userRoutes.post("/users", bodyParser.json(), postUserSchema, create);

userRoutes.get("/users", list);

userRoutes.get("/users/:id", find);

userRoutes.put("/users/:id", bodyParser.json(), putUserSchema, validateRequestSchema, update);

userRoutes.delete("/users/:id", remove);

export default userRoutes;