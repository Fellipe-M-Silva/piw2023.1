import { Router } from "express";
import { create, list, find, update, remove } from "../controllers/annotation.controller";
import bodyParser from "body-parser";
import { postAnnotationSchema, putAnnotationSchema } from "../validators/annotation.validator";
import { authenticateJWT } from "../middleware/authMiddleware";
import { validateRequestSchema } from "../validators/validationFunction";

const annotationRoutes = Router();

annotationRoutes.post("/annotations", authenticateJWT, bodyParser.json(), postAnnotationSchema, validateRequestSchema, create);

annotationRoutes.get("/annotations", list);

annotationRoutes.get("/annotations/:id", find);

annotationRoutes.put("/annotations/:id", authenticateJWT, bodyParser.json(), putAnnotationSchema, validateRequestSchema, update);

annotationRoutes.delete("/annotations/:id", authenticateJWT, remove);

export default annotationRoutes;