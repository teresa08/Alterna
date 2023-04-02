import { Router } from "express";
import { getAll, getById, create, remove, update } from "./controller";

export const villano = Router()

villano.get('/', getAll);

villano.get('/:id', getById);

villano.post('/', create);

villano.delete('/:id', remove);

villano.put('/:id', update);