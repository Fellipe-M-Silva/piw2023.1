import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Quote } from "../entity/Quote";
import { Annotation } from "../entity/Annotation";

async function create(req: Request, res: Response) {
    try {
        const { text, startingPage, endingPage, note, annotationId, creatorUsername } = req.body;
        const quote = new Quote();
        quote.text = text;
        quote.startingPage = startingPage;
        quote.endingPage = endingPage;
        quote.note = note;
        quote.creatorUsername = creatorUsername;

        const annotationInDB = await AppDataSource.manager.findOne(Annotation, {
            where: { 
                id:annotationId
            }
        });
        
        if (!annotationInDB) {
            return res.status(400).json({
                errors: [ {
                        type: "field",
                        value: annotationId,
                        msg: "Fichamento não encontrado",
                        path: "userId",
                        location: "body"
                } ]
            })
        }
        
        // const userInBD = await AppDataSource.manager.findOne(User, {
        //     where: { id : userId }
        // });

        // if (!userInBD) {
        //     return res.status(400).json({
        //         errors: [ {
        //                 type: "field",
        //                 value: annotationId,
        //                 msg: "Usuário não encontrado",
        //                 path: "userId",
        //                 location: "body"
        //         } ]
        //     })
        // }

        quote.annotation = annotationInDB

        if (quote) {
            await AppDataSource.manager.save(quote);
            return res.status(200).json({data:quote});
        } else {
            return res.sendStatus(400);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function list(req: Request, res: Response) {
    const filtros = req.query
    const quotes = await AppDataSource.manager.find(Quote, { relations: ['annotation'], where: filtros });
    res.json({ data: quotes });
}
async function find(req: Request, res: Response) {
    try {
        const id = req.params.id
        const quoteToBeFound = await AppDataSource.manager.findOne(Quote, {
            where: {id : id},
            relations: ['annotation'] 
        });

        if (quoteToBeFound) {
            return res.status(200).json(quoteToBeFound);
        } else {
            return res.status(404).json({
                errors: [ {
                        type: "field",
                        value: id,
                        msg: "Citação não encontrada",
                        path: "id",
                        location: "param"
                } ]
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = req.params.id
        const { text, startingPage, endingPage, note } = req.body;
        const quote = await AppDataSource.manager.findOneBy(Quote, { id : id })

        if (quote) {
            quote.text = text;
            quote.startingPage = startingPage;
            quote.endingPage = endingPage;
            quote.note = note;

            await AppDataSource.manager.save(quote);
            return res.status(200).json({data:quote});
        }
        else {
            return res.status(404).json({
                errors: [ {
                        type: "field",
                        value: id,
                        msg: "Citação não encontrada",
                        path: "id",
                        location: "param"
                } ]
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id
        const quote = await AppDataSource.manager.findOneBy(Quote, { id: id });

        if (quote) {
            await AppDataSource.manager.remove(quote);
            return res.status(200).json({data:quote});
        } else {
            return res.status(404).json({
                errors: [ {
                        type: "field",
                        value: id,
                        msg: "Citação não encontrada",
                        path: "id",
                        location: "param"
                } ]
            });
        }
    } catch (error) {
        console.log(error)
    }
}

export { create, list, find, update, remove };