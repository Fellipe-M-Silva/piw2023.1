import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";


async function create (req: Request, res: Response) {    
    try {
        const { name, username, email, password, isAdmin, isSuperAdmin } = req.body;
        const user = new User();

        user.name = name; 
        user.username = username; 
        user.email = email; 
        user.isAdmin = isAdmin; 
        user.isSuperAdmin = isSuperAdmin; 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;

        if (user) {
            
            await AppDataSource.manager.save(user)
            return res.status(201).json({
                data: user
            })
        }
        else {
            return res.status(400)
        }
    } catch (error) {
        console.log(error)
    }
}

async function list (req: Request, res: Response) {
    const users = await AppDataSource.manager.find(User);
    res.json({ data: users });
}

async function find (req: Request, res: Response) {
    try {
        const id = req.params.id
        const user = await AppDataSource.manager.findOne(User, { 
            where: { id : id }
        });

        if (user != null) { 
            return res.status(200).json({ data: user }) }
        else { return res.status(404).json({
            errors: [ {
			        type: "field",
			        value: id,
			        msg: "Usuário não encontrado",
			        path: "id",
			        location: "param"
		    } ]
        })}
    }
    catch (error) {
        console.log(error);
    }
}

async function update (req: Request, res: Response) {
    try {
        const id = req.params.id
        const { name, username, email, password, isAdmin, isSuperAdmin } = req.body;
        const user = await AppDataSource.manager.findOneBy(User, { id : id })

        if (user) {
            user.name = name; 
            user.username = username;
            user.email = email; 
            user.isAdmin = isAdmin; 
            user.isSuperAdmin = isSuperAdmin; 

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;

            await AppDataSource.manager.save(user);
            return res.status(200).json({ data: user });
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
        console.log(error);
    }
}

async function remove (req: Request, res: Response) {
    try {
        const id = req.params.id
        const user = await AppDataSource.manager.findOneBy(User, { id : id });

        if (user != null) { 
            await AppDataSource.manager.remove(user);
            return res.status(200).json({ data: user }) }
        else { return res.status(404).json({
            errors: [ {
			        type: "field",
			        value: id,
			        msg: "Usuário não encontrado",
			        path: "id",
			        location: "param"
		    } ]
        })}
    }
    catch (error) {
        console.log(error);
    }
}

export { create, list, find, update, remove };