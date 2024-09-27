import { Router } from "express";
import { create, list, find, update, remove } from "../controllers/annotation.controller";
import bodyParser from "body-parser";
import { postAnnotationSchema, putAnnotationSchema } from "../validators/annotation.validator";
import { authenticateJWT } from "../middleware/authMiddleware";
import { validateRequestSchema } from "../validators/validationFunction";

const annotationRoutes = Router();
// annotationRoutes.use(authenticateJWT) 

annotationRoutes.post("/annotations", bodyParser.json(), postAnnotationSchema, create);

annotationRoutes.get("/annotations", list);

annotationRoutes.get("/annotations/:id", find);

annotationRoutes.put("/annotations/:id", bodyParser.json(), putAnnotationSchema, validateRequestSchema, update);

annotationRoutes.delete("/annotations/:id", remove);

export default annotationRoutes;