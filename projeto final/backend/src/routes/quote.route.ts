import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/quote.controller";
import bodyParser from "body-parser";
import { quoteSchema } from "../validators/quote.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from 'cors'

const quoteRoutes = Router();

quoteRoutes.post("/quotes", cors(), bodyParser.json(), quoteSchema, validateRequestSchema, Create);

quoteRoutes.get("/quotes", cors(), List);

quoteRoutes.get("/quotes/:id", cors(), Find);

quoteRoutes.put("/quotes/:id", cors(), bodyParser.json(), quoteSchema, validateRequestSchema, Update);

quoteRoutes.delete("/quotes/:id", cors(), Delete);

export default quoteRoutes;