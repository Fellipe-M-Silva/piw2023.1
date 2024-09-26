import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/quote.controller";
import bodyParser from "body-parser";
import { quoteSchema } from "../validators/quote.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from 'cors'
import { authenticateJWT } from "../middleware/authMiddleware";

const quoteRoutes = Router();

quoteRoutes.post("/quotes", authenticateJWT, bodyParser.json(), quoteSchema, validateRequestSchema, Create);

quoteRoutes.get("/quotes", authenticateJWT, List);

quoteRoutes.get("/quotes/:id", authenticateJWT, Find);

quoteRoutes.put("/quotes/:id", authenticateJWT, bodyParser.json(), quoteSchema, validateRequestSchema, Update);

quoteRoutes.delete("/quotes/:id", authenticateJWT, Delete);

export default quoteRoutes;