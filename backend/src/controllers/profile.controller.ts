import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Profile } from "../entity/Profile";

async function Create (req: Request, res: Response) {
    const { name, permissions } = req.body;
    const newProfile = new Profile();

    newProfile.name = name;
    newProfile.permissions = permissions;

    await AppDataSource.manager.save(newProfile);

    res.sendStatus(201);
}

async function List (req: Request, res: Response) {
    const profiles = await AppDataSource.manager.find(Profile);

    res.json(profiles);
}

async function Find (req: Request, res: Response) {
    const {id} = req.params;
    const profile = await AppDataSource.manager.findOneBy(Profile, {id:id});

    res.json(profile);
}

async function Update (req: Request, res: Response) {
    const {id} = req.params;
    const {name} = req.body;

    const profile = await AppDataSource.manager.findOneBy(Profile, {id:id});
    if (name) {
        profile.name = name;
    }

    await AppDataSource.manager.save(profile);

    res.sendStatus(202);
}

async function Delete (req: Request, res: Response) {
    const {id} = req.params;
    const profile = await AppDataSource.manager.findOneBy(Profile, {id:id});

    await AppDataSource.manager.remove(profile);

    res.sendStatus(200);
}

export { Create, List, Find, Update, Delete };