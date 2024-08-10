import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/author.controller";
import bodyParser from "body-parser";
import { validateRequestSchema } from "../validators/validationFunction";
import { authorSchema } from "../validators/author.validator";

const authorRoutes = Router();

authorRoutes.post("/author", bodyParser.json(), authorSchema, validateRequestSchema, Create);

authorRoutes.get("/author", List);

authorRoutes.get("/author/:id", Find);

authorRoutes.put("/author/:id", bodyParser.json(), authorSchema, validateRequestSchema, Update);

authorRoutes.delete("/author/:id", Delete);

export default authorRoutes;