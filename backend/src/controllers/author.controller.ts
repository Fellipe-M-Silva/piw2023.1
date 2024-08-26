import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Author } from "../entity/Author";

interface authorBody {
    name: string;
}

async function Create(req: Request, res: Response) {
    try {
        const data: authorBody = req.body;
        const newAuthor = new Author;
        newAuthor.name = data.name;

        if (newAuthor != null) {
            await AppDataSource.manager.save(newAuthor);
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
    const authors = await AppDataSource.manager.find(Author);
    res.json(authors);
}

async function Find(req: Request, res: Response) {
    try {
        const authorToBeFound = await AppDataSource.manager.findOneBy(Author, { id: req.params.id });

        if (authorToBeFound != null) {
            return res.status(200).json(authorToBeFound);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error)
    }
}

async function Update(req: Request, res: Response) {
    try {
        const data: authorBody = req.body;
        const authorToBeUpdated = await AppDataSource.manager.findOneBy(Author, { id: req.params.id })

        if (authorToBeUpdated != null) {
            authorToBeUpdated.name = data.name;

            await AppDataSource.manager.save(authorToBeUpdated);
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
        const authorToBeDeleted = await AppDataSource.manager.findOneBy(Author, { id: req.params.id });

        if (authorToBeDeleted != null) {
            await AppDataSource.manager.remove(authorToBeDeleted);
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error)
    }
}

export { Create, List, Find, Update, Delete };