import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/quote.controller";
import bodyParser from "body-parser";
import { quoteSchema } from "../validators/quote.validator";
import { validateRequestSchema } from "../validators/validationFunction";

const quoteRoutes = Router();

quoteRoutes.post("/quote", bodyParser.json(), quoteSchema, validateRequestSchema, Create);

quoteRoutes.get("/quote", List);

quoteRoutes.get("/quote/:id", Find);

quoteRoutes.put("/quote/:id", bodyParser.json(), quoteSchema, validateRequestSchema, Update);

quoteRoutes.delete("/quote/:id", Delete);

export default quoteRoutes;