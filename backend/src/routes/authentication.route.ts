import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bodyParser from "body-parser";

const authRoutes = Router();

authRoutes.post("/cadastro", bodyParser.json(), async (req:Request, res:Response) => {
    const {name, email, password} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.password = hashedPassword;

    await AppDataSource.manager.save(newUser);
    res.sendStatus(201).send("Conta criada");
})

const secretKey = process.env.BACK_SECRET || "meianoiteeuteconto";

authRoutes.post('/login', bodyParser.json(), async (req:Request, res:Response) => {
    const { email, password } = req.body;
    const user = await AppDataSource.manager.findOneBy(User, {email:email});

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Informações inválidas');
    }

    const token = jwt.sign({ userId: user.email }, secretKey, { expiresIn: '1h' });
  
    res.status(200).send({ token });
  });

export default authRoutes;