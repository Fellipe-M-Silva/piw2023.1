import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Quote } from "../entity/Quote";

async function Create (req: Request, res: Response) {
    const {annotation, text, startingPage, endingPage, note} = req.body;
    const newQuote = new Quote();
    newQuote.annotation = annotation
    newQuote.text = text;
    newQuote.startingPage = startingPage;
    newQuote.endingPage = endingPage;
    newQuote.note = note;

    await AppDataSource.manager.save(newQuote);
    res.sendStatus(201);
}

async function List (req: Request, res: Response) {
    const quotes = await AppDataSource.manager.find(Quote);
    res.json(quotes);
}
async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const quoteToBeFound = await AppDataSource.manager.findOneBy(Quote, {id:id});
    res.json(quoteToBeFound);
}
async function Update (req: Request, res: Response) {
    const {id} = req.params;
    //Não adicionei fichário por ele não ser alterável
    const {text, startingPage, endingPage, note} = req.body;

    const quoteToBeUpdated = await AppDataSource.manager.findOneBy(Quote, {id:id});
    if (text) {
        quoteToBeUpdated.text = text;
    }
    if (startingPage) {
        quoteToBeUpdated.startingPage = startingPage;
    }
    if (endingPage) {
        quoteToBeUpdated.endingPage = endingPage;
    }
    if (note) {
        quoteToBeUpdated.note = note;
    }

    await AppDataSource.manager.save(quoteToBeUpdated);
    res.sendStatus(202);
    res.json(quoteToBeUpdated);
}

async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const quoteToBeDeleted = await AppDataSource.manager.findOneBy(Quote, {id:id});

    await AppDataSource.manager.remove(quoteToBeDeleted);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };