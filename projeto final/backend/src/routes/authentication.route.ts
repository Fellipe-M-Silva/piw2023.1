import { Router } from "express";
import bodyParser from "body-parser";
import { Login, Register } from "../controllers/authentication.controller";
import { loginSchema, registerSchema } from "../validators/authentication.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import { authenticateJWT } from "../middleware/authMiddleware";

const authRoutes = Router();
authRoutes.use(authenticateJWT)  

authRoutes.post("/cadastro", bodyParser.json(), registerSchema, validateRequestSchema, Register)

authRoutes.post("/login", bodyParser.json(), loginSchema, validateRequestSchema, Login)

authRoutes.get("/logout", bodyParser.json(), loginSchema, validateRequestSchema, Login)

export default authRoutes;