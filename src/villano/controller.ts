import { Request, Response } from "express";
import { villian } from "../models/villian.entity";
import { AppDataSource } from "../../DataSource";

const heroRepository = AppDataSource.getRepository(villian);
const heroes: villian[] = [];


export const getAll = async(req: Request, res: Response) => {
    const results = await heroRepository.find();
    return res.json(results);
}

export const getById = async(req: Request, res: Response) => {
    const _id =  req.params.id
    
    const heroe = await heroRepository.findOneBy({id:parseInt(_id)})

    if (!heroe) {
        return res.status(404).json(
            {
                message: 'Super villano Not Found'
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
                message: `villano ${alte} already exists`
            })
    }
    const newVillano = heroRepository.create({ alte, name });
     await heroRepository.insert(newVillano);

    res.json(newVillano);
}
export const remove = async(req: Request, res: Response) => {
    const _id = req.params.id;

    const Search = await heroRepository.findOneBy({id: parseInt (_id)})
  

    if (!Search) {
        return res.status(404).json(`The Villano ${_id} not found`)
    }else{
        const index = await heroRepository.delete(Search)
    }


    res.json("Villano eliminado");
}

export const update = async (req: Request, res: Response) => {
    const _id = req.params.id;
    const{alte, name} = req.body;
    const Search = await heroRepository.findOneBy({id: parseInt(_id)})

    if (!Search) {
        return res.status(401).json({
            message: `The Villano ${_id} not found`
        })
    }

    Search.alte = alte !== undefined ? alte : Search.alte;
    Search.name = name !== undefined ? name : Search.alte;
     const results = await heroRepository.save(Search)
    res.json(results);
}