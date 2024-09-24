import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/author.controller";
import bodyParser from "body-parser";
import { validateRequestSchema } from "../validators/validationFunction";
import { authorSchema } from "../validators/author.validator";

const authorRoutes = Router();

authorRoutes.post("/authors", bodyParser.json(), authorSchema, validateRequestSchema, Create);

authorRoutes.get("/authors", List);

authorRoutes.get("/authors/:id", Find);

authorRoutes.put("/authors/:id", bodyParser.json(), authorSchema, validateRequestSchema, Update);

authorRoutes.delete("/authors/:id", Delete);

export default authorRoutes;