import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/annotation.controller";
import bodyParser from "body-parser";
import { annotationSchema } from "../validators/annotation.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from 'cors'

const annotationRoutes = Router();

annotationRoutes.post("/annotations", cors(), bodyParser.json(), annotationSchema, validateRequestSchema, Create);

annotationRoutes.get("/annotations", cors(), List);

annotationRoutes.get("/annotations/:id", cors(), Find);

annotationRoutes.put("/annotations/:id", cors(), bodyParser.json(), annotationSchema, validateRequestSchema, Update);

annotationRoutes.delete("/annotations/:id", cors(), Delete);

export default annotationRoutes;