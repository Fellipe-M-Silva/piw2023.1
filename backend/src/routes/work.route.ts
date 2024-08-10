import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/work.controller";
import bodyParser from "body-parser";
import { workSchema } from "../validators/work.validator";
import { validateRequestSchema } from "../validators/validationFunction";

const workRoutes = Router();

workRoutes.post("/work", bodyParser.json(), workSchema, validateRequestSchema, Create);

workRoutes.get("/work", List);

workRoutes.get("/work/:id", Find);

workRoutes.put("/work/:id", bodyParser.json(), workSchema, validateRequestSchema, Update);

workRoutes.delete("/work/:id", Delete);

export default workRoutes;