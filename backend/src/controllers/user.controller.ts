import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

async function Create (req: Request, res: Response) {
    const {name, email, profile, password} = req.body;
    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.profile = profile;
    newUser.password = password;

    await AppDataSource.manager.save(newUser);
    res.sendStatus(201);
    res.json(newUser);
}
async function List (req: Request, res: Response) {
    const users = await AppDataSource.manager.find(User);
    res.json(users);
}
async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const user = await AppDataSource.manager.findOneBy(User, {id:id});
    res.json(user);
}
async function Update (req: Request, res: Response) {
    const {id} = req.params;
    const {name, email, profile, password} = req.body;

    const user = await AppDataSource.manager.findOneBy(User, {id:id});
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    if (profile) {
        user.profile = profile;
    }
    if (password) {
        user.password = password;
    }

    await AppDataSource.manager.save(user);
    res.sendStatus(202);
    res.json(user);
}
async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const user = await AppDataSource.manager.findOneBy(User, {id:id});

    await AppDataSource.manager.remove(user);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };