import { Router } from "express";
import bodyParser from "body-parser";
import { login, register, logout } from "../controllers/authentication.controller";
import { loginSchema, registerSchema } from "../validators/authentication.validator";
import { validateRequestSchema } from "../validators/validationFunction";

const authRoutes = Router();

authRoutes.post("/register", bodyParser.json(), registerSchema, validateRequestSchema, register)

authRoutes.post("/login", bodyParser.json(), loginSchema, validateRequestSchema, login)

authRoutes.get("/logout", logout)

export default authRoutes;