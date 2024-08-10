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

async function Create (req: Request, res: Response) {
    const data:quoteBody = req.body;
    const newQuote = new Quote();
    newQuote.annotation = data.annotation
    newQuote.text = data.text;
    newQuote.startingPage = data.startingPage;
    newQuote.endingPage = data.endingPage;
    newQuote.note = data.note;

    try {
        await AppDataSource.manager.save(newQuote);
        res.sendStatus(201);
        console.log("Registro criado.");
    }
    catch (err) {
        console.log(err);
    }
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
    const data:quoteBody = req.body;
    const quoteToBeUpdated = await AppDataSource.manager.findOneBy(Quote, {id:req.params.id})

    try { 
        quoteToBeUpdated.annotation = data.annotation;
        quoteToBeUpdated.text = data.text;
        quoteToBeUpdated.startingPage = data.startingPage;
        quoteToBeUpdated.endingPage = data.endingPage;
        quoteToBeUpdated.note = data.note;
        await AppDataSource.manager.save(quoteToBeUpdated);
        
        res.sendStatus(200)
        console.log("Registro atualizado");
    } catch (error) {
        console.log(error);
    }
    // const quoteToBeUpdated = await AppDataSource.manager.findOneBy(Quote, {id:id});
    // if (text) {
    //     quoteToBeUpdated.text = text;
    // }
    // if (startingPage) {
    //     quoteToBeUpdated.startingPage = startingPage;
    // }
    // if (endingPage) {
    //     quoteToBeUpdated.endingPage = endingPage;
    // }
    // if (note) {
    //     quoteToBeUpdated.note = note;
    // }

    // await AppDataSource.manager.save(quoteToBeUpdated);
    // res.sendStatus(202);
    // res.json(quoteToBeUpdated);
}

async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const quoteToBeDeleted = await AppDataSource.manager.findOneBy(Quote, {id:id});

    await AppDataSource.manager.remove(quoteToBeDeleted);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };