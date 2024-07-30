import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Annotation } from "../entity/Annotation";


async function Create (req: Request, res: Response) {
    const {isPublic, user, work, quotes } = req.body;
    const newAnnotation = new Annotation;
    newAnnotation.isPublic = isPublic;
    newAnnotation.user = user;
    newAnnotation.work = work;
    newAnnotation.quotes = quotes;

    await AppDataSource.manager.save(newAnnotation);
    res.sendStatus(201);
}
async function List (req: Request, res: Response) {
    const annotations = await AppDataSource.manager.find(Annotation);
    res.json(annotations);
}
async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const annotationToBeFound = await AppDataSource.manager.findOneBy(Annotation, {id:id});
    res.json(annotationToBeFound);
}
async function Update (req: Request, res: Response) {
    const {id} = req.params;
    const {isPublic, user, work, quotes } = req.body;

    const annotationToBeUpdated = await AppDataSource.manager.findOneBy(Annotation, {id:id});
    if (isPublic) {
        annotationToBeUpdated.isPublic = isPublic;
    }
    if (user) {
        annotationToBeUpdated.user = user;
    }
    if (work) {
        annotationToBeUpdated.work = work;
    }
    if (quotes) {
        annotationToBeUpdated.quotes = quotes;
    }
    
    await AppDataSource.manager.save(annotationToBeUpdated);
    res.sendStatus(202);
}
async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const annotationToBeDeleted = await AppDataSource.manager.findOneBy(Annotation, {id:id});

    await AppDataSource.manager.remove(annotationToBeDeleted);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };