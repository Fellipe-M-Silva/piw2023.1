import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Annotation } from "../entity/Annotation";
import { User } from "../entity/User";
import { Work } from "../entity/Work";
import { Quote } from "../entity/Quote";


interface annotationBody {
    isPublic: boolean;
    user: User;
    work: Work;
    quotes: Quote[]
}

async function Create(req: Request, res: Response) {
    try {
        const annotationData: annotationBody = req.body;
        const newAnnotation = new Annotation;
        newAnnotation.isPublic = annotationData.isPublic;
        newAnnotation.user = annotationData.user;
        newAnnotation.work = annotationData.work;
        newAnnotation.quotes = annotationData.quotes;

        if (newAnnotation != null) {
            await AppDataSource.manager.save(newAnnotation);
            return res.sendStatus(201);
        }
        else {
            return res.sendStatus(400);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function List(req: Request, res: Response) {
    const annotations = await AppDataSource.manager.find(Annotation);
    res.json(annotations);
}

async function Find(req: Request, res: Response) {
    try {
        const annotationToBeFound = await AppDataSource.manager.findOneBy(Annotation, { id: req.params.id });

        if (annotationToBeFound != null) {
            return res.status(200).json(annotationToBeFound);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error)
    }

}

async function Update(req: Request, res: Response) {
    try {
        const data: annotationBody = req.body;
        const annotationToBeUpdated = await AppDataSource.manager.findOneBy(Annotation, { id: req.params.id });

        if (annotationToBeUpdated != null) {
            annotationToBeUpdated.isPublic = data.isPublic;
            annotationToBeUpdated.user = data.user;
            annotationToBeUpdated.work = data.work;
            annotationToBeUpdated.quotes = data.quotes;

            await AppDataSource.manager.save(annotationToBeUpdated);
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
    }

}

async function Delete(req: Request, res: Response) {
    try {
        const annotationToBeDeleted = await AppDataSource.manager.findOneBy(Annotation, { id: req.params.id });

        if (annotationToBeDeleted != null) {
            await AppDataSource.manager.remove(annotationToBeDeleted);
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error)
    }
}

export { Create, List, Find, Update, Delete };