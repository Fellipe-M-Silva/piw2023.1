import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

async function Create (req: Request, res: Response) {
    const {name, email, password, isAdmin, isSuperAdmin} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashedPassword;
    newUser.isAdmin = isAdmin;
    newUser.isSuperAdmin = isSuperAdmin;

    await AppDataSource.manager.save(newUser);
    res.sendStatus(201);
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
    const {name, email, password, isAdmin, isSuperAdmin} = req.body;

    const user = await AppDataSource.manager.findOneBy(User, {id:id});
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    if (isAdmin) {
        user.isAdmin = isAdmin;
    }
    if (isSuperAdmin) {
        user.isSuperAdmin = isSuperAdmin;
    }
    if (password) {
        const salt = await bcrypt.genSalt(9012);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
    }

    await AppDataSource.manager.save(user);
    res.sendStatus(202);
}

async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const user = await AppDataSource.manager.findOneBy(User, {id:id});

    await AppDataSource.manager.remove(user);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };