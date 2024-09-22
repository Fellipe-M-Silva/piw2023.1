import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/annotation.controller";
import bodyParser from "body-parser";
import { annotationSchema } from "../validators/annotation.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from 'cors'

const annotationRoutes = Router();

annotationRoutes.post("/annotation", cors(), bodyParser.json(), annotationSchema, validateRequestSchema, Create);

annotationRoutes.get("/annotations", cors(), List);

annotationRoutes.get("/annotation/:id", cors(), Find);

annotationRoutes.put("/annotation/:id", cors(), bodyParser.json(), annotationSchema, validateRequestSchema, Update);

annotationRoutes.delete("/annotation/:id", cors(), Delete);

export default annotationRoutes;