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

async function Create (req: Request, res: Response) {
    const annotationData:annotationBody = req.body;
    const newAnnotation = new Annotation;
    newAnnotation.isPublic = annotationData.isPublic;
    newAnnotation.user = annotationData.user;
    newAnnotation.work = annotationData.work;
    newAnnotation.quotes = annotationData.quotes;

    try {
        await AppDataSource.manager.save(newAnnotation);
        res.sendStatus(201);
        console.log("Registro criado.");
    }
    catch (err) {
        console.log(err);
    }
}

async function List (req: Request, res: Response) {
    const annotations = await AppDataSource.manager.find(Annotation);
    res.json(annotations);
}
async function Find (req: Request, res: Response) {
    const annotationToBeFound = await AppDataSource.manager.findOneBy(Annotation, {id:req.params.id});
    res.json(annotationToBeFound);
}
async function Update (req: Request, res: Response) {
    const data:annotationBody = req.body;
    const annotationToBeUpdated = await AppDataSource.manager.findOneBy(Annotation, {id:req.params.id});

    try { 
        annotationToBeUpdated.isPublic = data.isPublic;
        annotationToBeUpdated.user = data.user;
        annotationToBeUpdated.work = data.work;
        annotationToBeUpdated.quotes = data.quotes;   

        await AppDataSource.manager.save(annotationToBeUpdated);
        res.sendStatus(200)
        console.log("Registro atualizado");
    } catch (error) {
        console.log(error);
    }

    // const annotationToBeUpdated = await AppDataSource.manager.findOneBy(Annotation, {id:id});
    // if (isPublic) {
    //     annotationToBeUpdated.isPublic = isPublic;
    // }
    // if (user) {
    //     annotationToBeUpdated.user = user;
    // }
    // if (work) {
    //     annotationToBeUpdated.work = work;
    // }
    // if (quotes) {
    //     annotationToBeUpdated.quotes = quotes;
    // }
    
    // await AppDataSource.manager.save(annotationToBeUpdated);
    // res.sendStatus(202);
}
async function Delete (req: Request, res: Response) {
    const annotationToBeDeleted = await AppDataSource.manager.findOneBy(Annotation, {id:req.params.id});

    await AppDataSource.manager.remove(annotationToBeDeleted);
    res.sendStatus(200);
    console.log("Registro excluído");
}

export { Create, List, Find, Update, Delete };