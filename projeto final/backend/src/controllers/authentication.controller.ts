import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

async function register(req: Request, res: Response) {
    try {
        const { name, username, email, password } = req.body;
        const user = new User();

        user.name = name; 
        user.username = username; 
        user.email = email; 

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

const secretKey = process.env.BACK_SECRET || "meianoiteeuteconto";

async function login(req: Request, res: Response) {
    try {
        const { email, username, password } = req.body;

        let user

        if (!email) {
            user = await AppDataSource.manager.findOne(User, {where : {email: email}});
        }
        else if (!username) {
            user = await AppDataSource.manager.findOne(User, {where : {username: username}});
        }
        
        console.log(await bcrypt.compare(password, user.password))

        if (user && (await bcrypt.compare(password, user.password))) {
            
            const token = jwt.sign({ userId: user.email }, secretKey, { expiresIn: '1h' });
            // return res.status(200).send({ user, jwt: token });
            return res.status(200).json({ user, token })
        }
        else {
            return res.status(401).json({
                errors: [ {
                        type: "field",
                        msg: "Usuário não autorizado",
                        path: "id",
                        location: "param"
                } ]
            })
        }
    } catch (error) {
        console.log(error);
    }
}

async function logout(req: Request, res: Response) {
    res.status(200).json({
        data: {
            message: "Logout successful"
        }
    })
}

export { register, login, logout };