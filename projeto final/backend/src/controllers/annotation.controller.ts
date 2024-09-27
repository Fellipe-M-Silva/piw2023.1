import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Annotation } from "../entity/Annotation";
import { User } from "../entity/User";

async function create (req: Request, res: Response) {
    try {
        const { isPublic, workTitle, workAuthors, userId, creatorUsername } = req.body;
        const annotation = new Annotation();
        annotation.isPublic = isPublic;
        annotation.workTitle = workTitle;
        annotation.workAuthors = workAuthors;
        annotation.createdAt = new Date();
        annotation.updatedAt = new Date();
        
        const userinBD = await AppDataSource.manager.findOne(User, {
            where: {
                id: userId
            }
        });

        if (!userinBD) {
            return res.status(400).json({
                errors: [ {
                        type: "field",
                        value: userId,
                        msg: "Usuário não encontrado",
                        path: "userId",
                        location: "body"
                } ]
            })
        }

        const usernameInDB = await AppDataSource.manager.findOneBy(User, {username: creatorUsername})

        if (!usernameInDB) {
            return res.status(400).json({
                errors: [ {
                        type: "field",
                        value: usernameInDB,
                        msg: "Usuário não encontrado",
                        path: "creatorUsername",
                        location: "body"
                } ]
            })
        }

        annotation.user = userinBD
        annotation.creatorUsername = usernameInDB.username

        if (annotation != null) {
            await AppDataSource.manager.save(annotation);
            return res.status(200).json({ data: annotation });
        }
        else {
            return res.sendStatus(400);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function list(req: Request, res: Response) {
    const annotations = await AppDataSource.manager.find(Annotation);
    res.json({ data: annotations });
}

async function find(req: Request, res: Response) {
    try {
        const id = req.params.id
        const annotation = await AppDataSource.manager.findOne(Annotation, {
            where: { id: id },
            relations: ['user', 'quotes']
        })

        if (annotation != null) {
            return res.status(200).json({ data: annotation });
        } else {
            return res.status(404).json({
                errors: [ {
                        type: "field",
                        value: id,
                        msg: "Fichamento não encontrado",
                        path: "id",
                        location: "param"
                } ]
            });
        }
    } catch (error) {
        console.log(error)
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = req.params.id
        const { isPublic, workTitle, workAuthors } = req.body;
        const annotation = await AppDataSource.manager.findOneBy(Annotation, { id : id });

        if (annotation) {
            annotation.isPublic = isPublic;
            annotation.workTitle = workTitle;
            annotation.workAuthors = workAuthors;
            annotation.updatedAt = new Date();

            await AppDataSource.manager.save(annotation);
            
            return res.status(200).json({ data: annotation });
        } else {
            return res.status(404).json({
                errors: [ {
                        type: "field",
                        value: id,
                        msg: "Usuário não encontrado",
                        path: "id",
                        location: "param"
                } ]
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function remove (req: Request, res: Response) {
    try {
        const id = req.params.id
        const annotation = await AppDataSource.manager.findOneBy(Annotation, { id: id });

        if (annotation) {
            await AppDataSource.manager.remove(annotation);
            return res.status(200).json({ data: annotation });
        }
        else {
            return res.status(404).json({
                errors: [ {
                        type: "field",
                        value: id,
                        msg: "Usuário não encontrado",
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