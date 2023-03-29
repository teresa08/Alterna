import { Request, Response } from "express";
import { Heroe } from "../models/heroe.entity";
import { AppDataSource } from "../../DataSource";

const heroRepository = AppDataSource.getRepository(Heroe);
const heroes: Heroe[] = [];


export const getAll = async(req: Request, res: Response) => {
    const results = await heroRepository.find();
    return res.json(results);
}

export const getByName = async(req: Request, res: Response) => {
    const alter = req.params.alte;

    const heroe = await heroRepository.findOneBy({alte: alter})

    if (!heroe) {
        return res.status(404).json(
            {
                message: 'Super Hero Not Found'
            }
        );
    }

   return res.json(heroe);
}

export const create = async (req: Request, res: Response) => {

    const { alte, name } = req.body;

    const oldHero = await heroRepository.findOneBy({ alte });

    if (oldHero) {
        return res
            .status(400)
            .json({
                message: `Hero ${alte} already exists`
            })
    }
    const newHero = heroRepository.create({ alte, name });
     await heroRepository.insert(newHero);

    res.json(newHero);
}
export const remove = async(req: Request, res: Response) => {
    const alter = req.params.alte;

    const Search = await heroRepository.findOneBy({alte: alter})
  

    if (!Search) {
        return res.status(404).json(`The hero ${alter} not found`)
    }else{
        const index = await heroRepository.delete(Search)
    }


    res.json("heroe eliminado");
}

export const update = async (req: Request, res: Response) => {
    const alter = req.params.alte;
    const{alte, name} = req.body;
    const Search = await heroRepository.findOneBy({alte: alter})

    if (!Search) {
        return res.status(401).json({
            message: `The hero ${alter} not found`
        })
    }

    Search.alte = alter !== undefined ? alter : Search.alte;
    Search.name = name !== undefined ? name : Search.alte;
     const results = await heroRepository.save(Search)
    res.json(results);
}