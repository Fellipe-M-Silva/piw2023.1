import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Permission } from "../entity/Permission";

async function Create (req: Request, res: Response) {
    const {name, isActive } = req.body;
    const newPermission = new Permission();

    newPermission.name = name;
    newPermission.isActive = isActive;

    await AppDataSource.manager.save(newPermission);

    res.sendStatus(201);
}

async function List (req: Request, res: Response) {
    const permissions = await AppDataSource.manager.find(Permission);

    res.json(permissions);
}

async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const permission = await AppDataSource.manager.findOneBy(Permission, {id:id});

    res.json(permission);
}

async function Update (req: Request, res: Response) {
    const {id} = req.params;
    const {name, isActive} = req.body;

    const permission = await AppDataSource.manager.findOneBy(Permission, {id:id});
    if (name) {
        permission.name = name;
    }

    await AppDataSource.manager.save(permission);

    res.sendStatus(202);
}

async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const permission = await AppDataSource.manager.findOneBy(Permission, {id:id});

    await AppDataSource.manager.remove(permission);

    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };