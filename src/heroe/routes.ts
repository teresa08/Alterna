import { Router } from "express";
import { getAll, getById, create, remove, update } from "./controller";

export const heroeRoute = Router();

heroeRoute.get('/', getAll);

heroeRoute.get('/:id', getById);

heroeRoute.post('/', create);

heroeRoute.delete('/:id', remove);

heroeRoute.put('/:id', update);

