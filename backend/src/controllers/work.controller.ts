import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Work } from "../entity/Work";
import { Author } from "../entity/Author";

interface workBody {
    title: string;
    edition: string;
    publisher: string;
    publishingYear: number;
    authors: Author[]
}

async function Create (req: Request, res: Response) {
    const data:workBody = req.body;
    const newWork = new Work();
    newWork.title = data.title;
    newWork.edition = data.edition;
    newWork.publisher = data.publisher;
    newWork.publishingYear = Number(data.publishingYear);
    newWork.authors = data.authors;

    try {
        await AppDataSource.manager.save(newWork);
        res.sendStatus(201);
        console.log("Registro criado.");
    }
    catch (err) {
        console.log(err);
    }
}

async function List (req: Request, res: Response) {
    const works = await AppDataSource.manager.find(Work);

    res.json({works});
}

async function Find (req: Request, res: Response) {
    const { id } = req.params;
    const workToBeFound = await AppDataSource.manager.findOneBy(Work, {id:id});
    res.json(workToBeFound);
}
async function Update (req: Request, res: Response) {
    const data:workBody = req.body;
    const workToBeUpdated = await AppDataSource.manager.findOneBy(Work, {id:req.params.id});

    try { 
        workToBeUpdated.title = data.title;
        workToBeUpdated.edition = data.edition;
        workToBeUpdated.publisher = data.publisher;
        workToBeUpdated.publishingYear = Number(data.publishingYear);
        workToBeUpdated.authors = data.authors;
        
        await AppDataSource.manager.save(workToBeUpdated);

        res.sendStatus(200)
        console.log("Registro atualizado");
    } catch (error) {
        console.log(error);
    }
    // if (title) {
    //     workToBeUpdated.title = title;
    // }
    // if (edition) {
    //     workToBeUpdated.edition = edition;
    // }
    // if (publisher) {
    //     workToBeUpdated.publisher = publisher;
    // }
    // if (publishingYear) {
    //     workToBeUpdated.publishingYear = publishingYear;
    // }

    // await AppDataSource.manager.save(workToBeUpdated);
    // res.sendStatus(202);
}

async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const workToBeDeleted = await AppDataSource.manager.findOneBy(Work, {id:id});

    await AppDataSource.manager.remove(workToBeDeleted);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };