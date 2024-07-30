import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Author } from "../entity/Author";

async function Create (req: Request, res: Response) {
    const {name} = req.body;
    const newAuthor = new Author;
    newAuthor.name = name;

    await AppDataSource.manager.save(newAuthor);
    res.sendStatus(201);
}
async function List (req: Request, res: Response) {
    const authors = await AppDataSource.manager.find(Author);
    res.json(authors);
}
async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const authorToBeFound = await AppDataSource.manager.findOneBy(Author, {id:id});
    res.json(authorToBeFound);
}
async function Update (req: Request, res: Response) {
    const {id} = req.params;
    const {name} = req.body;

    const authorToBeUpdated = await AppDataSource.manager.findOneBy(Author, {id:id});
    if (name) {
        authorToBeUpdated.name = name;
    }

    await AppDataSource.manager.save(authorToBeUpdated);
    res.sendStatus(202);
}
async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const authorToBeDeleted = await AppDataSource.manager.findOneBy(Author, {id:id});

    await AppDataSource.manager.remove(authorToBeDeleted);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };