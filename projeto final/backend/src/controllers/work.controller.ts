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

async function Create(req: Request, res: Response) {
    try {
        const data: workBody = req.body;
        const newWork = new Work();

        newWork.title = data.title;
        newWork.edition = data.edition;
        newWork.publisher = data.publisher;
        newWork.publishingYear = Number(data.publishingYear);
        newWork.authors = data.authors;

        if (newWork != null) {
            await AppDataSource.manager.save(newWork);
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
    const works = await AppDataSource.manager.find(Work);
    res.json({ works });
}

async function Find(req: Request, res: Response) {
    try {
        const workToBeFound = await AppDataSource.manager.findOneBy(Work, { id: req.params.id });

        if (workToBeFound != null) {
            return res.status(200).json(workToBeFound);
        }
        else
            return res.status(404);
    }
    catch (error) {
        console.log(error);
    }
}
async function Update(req: Request, res: Response) {
    try {
        const data: workBody = req.body;
        const workToBeUpdated = await AppDataSource.manager.findOneBy(Work, { id: req.params.id });

        if (workToBeUpdated != null) {
            workToBeUpdated.title = data.title;
            workToBeUpdated.edition = data.edition;
            workToBeUpdated.publisher = data.publisher;
            workToBeUpdated.publishingYear = Number(data.publishingYear);
            workToBeUpdated.authors = data.authors;

            await AppDataSource.manager.save(workToBeUpdated);
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(404);
        }

    } catch (error) {
        console.log(error);
    }
}

async function Delete(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const workToBeDeleted = await AppDataSource.manager.findOneBy(Work, { id: id });

        if (workToBeDeleted != null) {
            await AppDataSource.manager.remove(workToBeDeleted);
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(404);
        }
    }
    catch (error) {
        console.log(error)
    }
}

export { Create, List, Find, Update, Delete };