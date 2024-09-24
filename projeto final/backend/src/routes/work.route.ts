import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/work.controller";
import bodyParser from "body-parser";
import { workSchema } from "../validators/work.validator";
import { validateRequestSchema } from "../validators/validationFunction";

const workRoutes = Router();

workRoutes.post("/works", bodyParser.json(), workSchema, validateRequestSchema, Create);

workRoutes.get("/works", List);

workRoutes.get("/works/:id", Find);

workRoutes.put("/works/:id", bodyParser.json(), workSchema, validateRequestSchema, Update);

workRoutes.delete("/works/:id", Delete);

export default workRoutes;