import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Author } from "../entity/Author";

interface authorBody {
    name: string;
}

async function Create (req: Request, res: Response) {
    const data:authorBody = req.body;
    const newAuthor = new Author;
    newAuthor.name = data.name;
    
    try {
        await AppDataSource.manager.save(newAuthor);
        res.sendStatus(201);
        console.log("Registro criado.");
    }
    catch (err) {
        console.log(err);
    }
}


async function List (req: Request, res: Response) {
    const authors = await AppDataSource.manager.find(Author);
    res.json(authors);
}

async function Find (req: Request, res: Response) {
    const { id } = req.params;
    const authorToBeFound = await AppDataSource.manager.findOneBy(Author, {id:id});
    res.json(authorToBeFound);
}

async function Update (req: Request, res: Response) {
    const data:authorBody = req.body;
    const authorToBeUpdated = await AppDataSource.manager.findOneBy(Author, {id:req.params.id})

    try { 
        authorToBeUpdated.name = data.name;
        await AppDataSource.manager.save(authorToBeUpdated);

        res.sendStatus(200)
        console.log("Registro atualizado");
    } catch (error) {
        console.log(error);
    }
}

async function Delete (req: Request, res: Response) {
    const { id } = req.params;
    const authorToBeDeleted = await AppDataSource.manager.findOneBy(Author, {id:id});

    await AppDataSource.manager.remove(authorToBeDeleted);
    res.sendStatus(200);
    console.log("Registro excluído");
}

export { Create, List, Find, Update, Delete };