import { Router } from "express";
import { create, list, find, update, remove } from "../controllers/quote.controller";
import bodyParser from "body-parser";
import { quoteSchema } from "../validators/quote.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from 'cors'
import { authenticateJWT } from "../middleware/authMiddleware";

const quoteRoutes = Router();
// quoteRoutes.use(authenticateJWT)

quoteRoutes.post("/quotes", bodyParser.json(), quoteSchema, validateRequestSchema, create);

quoteRoutes.get("/quotes", list);

quoteRoutes.get("/quotes/:id", find);

quoteRoutes.put("/quotes/:id", bodyParser.json(), quoteSchema, validateRequestSchema, update);

quoteRoutes.delete("/quotes/:id", remove);

export default quoteRoutes;