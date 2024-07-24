import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Work } from "../entity/Work";

async function Create (req: Request, res: Response) {
    const {name, edition, publisher, publishingYear} = req.body;
    const newWork = new Work();
    newWork.name = name;
    newWork.edition = edition;
    newWork.publisher = publisher;
    newWork.publishingYear = publishingYear;

    await AppDataSource.manager.save(newWork);
    res.sendStatus(201);
    res.json(newWork);
}
async function List (req: Request, res: Response) {
    const works = await AppDataSource.manager.find(Work);
    res.json(works);
}
async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const workToBeFound = await AppDataSource.manager.findOneBy(Work, {id:id});
    res.json(workToBeFound);
}
async function Update (req: Request, res: Response) {
    const {id} = req.params;
    const {name, edition, publisher, publishingYear} = req.body;

    const workToBeUpdated = await AppDataSource.manager.findOneBy(Work, {id:id});
    if (name) {
        workToBeUpdated.name = name;
    }
    if (edition) {
        workToBeUpdated.edition = edition;
    }
    if (publisher) {
        workToBeUpdated.publisher = publisher;
    }
    if (publishingYear) {
        workToBeUpdated.publishingYear = publishingYear;
    }

    await AppDataSource.manager.save(workToBeUpdated);
    res.sendStatus(202);
    res.json(workToBeUpdated);
}
async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const workToBeDeleted = await AppDataSource.manager.findOneBy(Work, {id:id});

    await AppDataSource.manager.remove(workToBeDeleted);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };