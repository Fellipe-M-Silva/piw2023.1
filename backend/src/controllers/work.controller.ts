import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Work } from "../entity/Work";
import { Author } from "../entity/Author";


async function Create (req: Request, res: Response) {
    const {title, edition, publisher, publishingYear, authors} = req.body;
    const newWork = new Work();
    newWork.title = title;
    newWork.edition = edition;
    newWork.publisher = publisher;
    newWork.publishingYear = Number(publishingYear);
    newWork.authors = authors;

    await AppDataSource.manager.save(newWork);
    res.sendStatus(201);
}
async function List (req: Request, res: Response) {
    const works = await AppDataSource.manager.find(Work);
    const authorRepository = AppDataSource.getRepository(Author)
    const authors = await authorRepository.find({
    relations: {
        works: true,
    },
})
    res.json({works});
}
async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const workToBeFound = await AppDataSource.manager.findOneBy(Work, {id:id});
    res.json(workToBeFound);
}
async function Update (req: Request, res: Response) {
    const {id} = req.params;
    const {title, edition, publisher, publishingYear} = req.body;

    const workToBeUpdated = await AppDataSource.manager.findOneBy(Work, {id:id});
    if (title) {
        workToBeUpdated.title = title;
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