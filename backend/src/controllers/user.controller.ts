import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";

interface userBody {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}

async function Create (req: Request, res: Response) {    
    try {
        const data:userBody = req.body;
        const newUser = new User;

        newUser.name = data.name; 
        newUser.email = data.email; 
        newUser.isAdmin = data.isAdmin; 
        newUser.isSuperAdmin = data.isSuperAdmin; 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);
        newUser.password = hashedPassword;

        if (newUser != null) {
            await AppDataSource.manager.save(newUser);
            return res.sendStatus(201);    
        }
        else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error)
    }
}

async function List (req: Request, res: Response) {
    const users = await AppDataSource.manager.find(User);
    res.json(users);
}

async function Find (req: Request, res: Response) {
    try {
        const user = await AppDataSource.manager.findOneBy(User, {id:req.params.id});

        if (user != null) {
            return res.status(200).json(user);
        }
        else {
            return res.sendStatus(404);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function Update (req: Request, res: Response) {
    try {
        const data:userBody = req.body;
        const user = await AppDataSource.manager.findOneBy(User, {id:req.params.id})

        if (user != null) {
            user.name = data.name; 
            user.email = data.email; 
            user.isAdmin = data.isAdmin; 
            user.isSuperAdmin = data.isSuperAdmin; 

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
            user.name = data.name;

            await AppDataSource.manager.save(user);
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);
    }
}

async function Delete (req: Request, res: Response) {
    try {
        const user = await AppDataSource.manager.findOneBy(User, {id:req.params.id});

        if (user != null) {
            await AppDataSource.manager.remove(user);
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(400);
        }
    }
    catch (error) {
        console.log(error);
    }
}

export { Create, List, Find, Update, Delete };