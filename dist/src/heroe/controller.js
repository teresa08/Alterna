"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.remove = exports.create = exports.getByName = exports.getAll = void 0;
const heroe_entity_1 = require("../models/heroe.entity");
const DataSource_1 = require("../../DataSource");
const heroRepository = DataSource_1.AppDataSource.getRepository(heroe_entity_1.Heroe);
const heroes = [];
let _id = 0;
const getAll = (req, res) => {
    return res.json(heroes);
};
exports.getAll = getAll;
const getByName = (req, res) => {
    const alte = req.params.alte;
    const heroe = heroes.find((hero) => hero.alte.toLowerCase() === alte.toLowerCase());
    if (!heroe) {
        return res.status(404).json({
            message: 'Super Hero Not Found'
        });
    }
    res.json(heroe);
};
exports.getByName = getByName;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { alte, name } = req.body;
    const oldHero = yield heroRepository.findOneBy({ alte });
    if (oldHero) {
        return res
            .status(400)
            .json({
            message: `Hero ${alte} already exists`
        });
    }
    const newHero = heroRepository.create({ alte, name });
    yield heroRepository.insert(newHero);
    res.json(newHero);
});
exports.create = create;
const remove = (req, res) => {
    const { alte } = req.params;
    const index = heroes.findIndex((hero) => hero.alte.toLowerCase() === alte.toLowerCase());
    if (index < 0) {
        return res.status(404).json(`The hero ${alte} not found`);
    }
    const hero = heroes.splice(index, 1);
    res.json(hero);
};
exports.remove = remove;
const update = (req, res) => {
    const { alte, name } = req.body;
    const { id } = req.params;
    const hero = heroes.find((hero) => hero.id === Number.parseInt(id));
    if (!hero) {
        return res.status(401).json({
            message: `The hero ${alte} not found`
        });
    }
    hero.alte = alte !== undefined ? alte : hero.alte;
    hero.name = name !== undefined ? name : hero.alte;
    res.json(hero);
};
exports.update = update;
