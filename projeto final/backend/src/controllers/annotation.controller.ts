import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Annotation } from "../entity/Annotation";
import { User } from "../entity/User";
import { Work } from "../entity/Work";
import { Quote } from "../entity/Quote";

interface annotationBody {
    isPublic: boolean;
    userId: string;
    workTitle: string;
    workAuthors: string;
    quotes: Quote[]
}

async function Create(req: Request, res: Response) {
    console.log(req.body)
    try {
        const annotationData: annotationBody = req.body;
        const newAnnotation = new Annotation;
        newAnnotation.isPublic = annotationData.isPublic;
        newAnnotation.workTitle = annotationData.workTitle;
        newAnnotation.workAuthors = annotationData.workAuthors;

        const user = await AppDataSource.manager.findOneBy(User, {id:annotationData.userId});
        newAnnotation.user = user

        if (newAnnotation != null) {
            await AppDataSource.manager.save(newAnnotation);
            return res.status(201).send(newAnnotation);
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
            annotationToBeUpdated.workTitle = data.workTitle;
            annotationToBeUpdated.workAuthors = data.workAuthors;

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