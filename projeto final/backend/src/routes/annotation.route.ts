import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/annotation.controller";
import bodyParser from "body-parser";
import { annotationSchema } from "../validators/annotation.validator";
import { validateRequestSchema } from "../validators/validationFunction";

//criando rotas pra cada entidade :o
const annotationRoutes = Router();

annotationRoutes.post("/annotation", bodyParser.json(), annotationSchema, validateRequestSchema, Create);

annotationRoutes.get("/annotation", List);

annotationRoutes.get("/annotation/:id", Find);

annotationRoutes.put("/annotation/:id", bodyParser.json(), annotationSchema, validateRequestSchema, Update);

annotationRoutes.delete("/annotation/:id", Delete);

export default annotationRoutes;