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
    const data:userBody = req.body;
    const newUser = new User;

    newUser.name = data.name; 
    newUser.email = data.email; 
    newUser.isAdmin = data.isAdmin; 
    newUser.isSuperAdmin = data.isSuperAdmin; 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    newUser.password = hashedPassword;
    
    try {
        await AppDataSource.manager.save(newUser);
        console.log("Registro criado");
        res.sendStatus(201);    
    } catch (error) {
        console.log(error)
    }
    
}

// async function Create (req: Request, res: Response) {
//     const {name, email, password, isAdmin, isSuperAdmin} = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User();
//     newUser.name = name;
//     newUser.email = email;
//     newUser.password = hashedPassword;
//     newUser.isAdmin = isAdmin;
//     newUser.isSuperAdmin = isSuperAdmin;

//     await AppDataSource.manager.save(newUser);
//     res.sendStatus(201).send("Conta criada com sucesso!");
// }

async function List (req: Request, res: Response) {
    const users = await AppDataSource.manager.find(User);
    res.json(users);
}

async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const user = await AppDataSource.manager.findOneBy(User, {id:id});
    res.status(200).json(user);
}
async function Update (req: Request, res: Response) {
    const data:userBody = req.body;
    const userToBeUpdated = await AppDataSource.manager.findOneBy(User, {id:req.params.id})

    userToBeUpdated.name = data.name; 
    userToBeUpdated.email = data.email; 
    userToBeUpdated.isAdmin = data.isAdmin; 
    userToBeUpdated.isSuperAdmin = data.isSuperAdmin; 

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userToBeUpdated.password, salt);
    userToBeUpdated.password = hashedPassword;

    try { 
        userToBeUpdated.name = data.name;
        await AppDataSource.manager.save(userToBeUpdated);

        res.sendStatus(200)
        console.log("Registro atualizado");
    } catch (error) {
        console.log(error);
    }

    // const user = await AppDataSource.manager.findOneBy(User, {id:id});
    // if (name) {
    //     user.name = name;
    // }
    // if (email) {
    //     user.email = email;
    // }
    // if (isAdmin) {
    //     user.isAdmin = isAdmin;
    // }
    // if (isSuperAdmin) {
    //     user.isSuperAdmin = isSuperAdmin;
    // }
    // if (password) {
    //     const salt = await bcrypt.genSalt(9012);
    //     const hashedPassword = await bcrypt.hash(password, salt);

    //     user.password = hashedPassword;
    // }

    // await AppDataSource.manager.save(user);
    // res.sendStatus(202);
}

async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const user = await AppDataSource.manager.findOneBy(User, {id:id});

    await AppDataSource.manager.remove(user);
    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };