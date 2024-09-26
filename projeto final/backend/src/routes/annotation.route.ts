import { Router } from "express";
import { Create, List, Find, Update, Delete } from "../controllers/annotation.controller";
import bodyParser from "body-parser";
import { annotationSchema } from "../validators/annotation.validator";
import { validateRequestSchema } from "../validators/validationFunction";
import cors from 'cors'
import { authenticateJWT } from "../middleware/authMiddleware";

const annotationRoutes = Router();
// annotationRoutes.use(authenticateJWT) 

annotationRoutes.post("/annotations", authenticateJWT, bodyParser.json(), annotationSchema, validateRequestSchema, Create);

annotationRoutes.get("/annotations", List);

annotationRoutes.get("/annotations/:id", Find);

annotationRoutes.put("/annotations/:id", authenticateJWT, bodyParser.json(), annotationSchema, validateRequestSchema, Update);

annotationRoutes.delete("/annotations/:id", authenticateJWT, Delete);

export default annotationRoutes;