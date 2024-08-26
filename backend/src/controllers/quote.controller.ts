import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Quote } from "../entity/Quote";
import { Annotation } from "../entity/Annotation";

interface quoteBody {
    annotation: Annotation;
    text: string;
    startingPage: string;
    endingPage: string;
    note: string;
}

async function Create(req: Request, res: Response) {
    try {
        const data: quoteBody = req.body;
        const newQuote = new Quote();
        newQuote.annotation = data.annotation
        newQuote.text = data.text;
        newQuote.startingPage = data.startingPage;
        newQuote.endingPage = data.endingPage;
        newQuote.note = data.note;

        if (newQuote != null) {
            await AppDataSource.manager.save(newQuote);
            return res.sendStatus(201);
        } else {
            return res.sendStatus(400);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function List(req: Request, res: Response) {
    const quotes = await AppDataSource.manager.find(Quote);
    res.json(quotes);
}
async function Find(req: Request, res: Response) {
    try {
        const quoteToBeFound = await AppDataSource.manager.findOneBy(Quote, { id:req.params.id });

        if (quoteToBeFound != null) {
            return res.status(200).json(quoteToBeFound);
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.log(error);
    }
}

async function Update(req: Request, res: Response) {
    try {
        const data: quoteBody = req.body;
        const quoteToBeUpdated = await AppDataSource.manager.findOneBy(Quote, { id: req.params.id })

        if (quoteToBeUpdated != null) {
            quoteToBeUpdated.annotation = data.annotation;
            quoteToBeUpdated.text = data.text;
            quoteToBeUpdated.startingPage = data.startingPage;
            quoteToBeUpdated.endingPage = data.endingPage;
            quoteToBeUpdated.note = data.note;

            await AppDataSource.manager.save(quoteToBeUpdated);
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
    }
}

async function Delete(req: Request, res: Response) {
    try {
        const quoteToBeDeleted = await AppDataSource.manager.findOneBy(Quote, { id: req.params.id });

        if (quoteToBeDeleted != null) {
            await AppDataSource.manager.remove(quoteToBeDeleted);
            return res.sendStatus(200);
        } else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error)
    }
}

export { Create, List, Find, Update, Delete };