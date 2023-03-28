import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
let _id: number = 4;
const port = 3000;

interface Heroe {
  id: Number;
  nombre: String;
  alte: String;
}

const heroes: Heroe[] = [
  {
    id: 1,
    nombre: "Bruce Wayne",
    alte: "Batman",
  },
  {
    id: 2,
    nombre: "Damian Wayne",
    alte: "Robin",
  },
  {
    id: 3,
    nombre: "Clark Kent",
    alte: "SuperMan",
  },
];

app.get("/heroe_id/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  let Search = heroes.find((heroe) => heroe.id == parseInt(id));

  if (Search) {
    res.json(Search);
  }

  res.status(404).json("Not found");
});

app.post("/heroe", (req: Request, res: Response) => {
  const { alte, nombre } = req.body;

  if (alte && nombre) {
    _id++;
    heroes.push({
      id: _id,
      nombre: nombre,
      alte: alte,
    });

    res.status(200).json("heroe agregado");
  }
  res.status(400).json("Datos no esperado");
});

app.get("/heroe", (req: Request, res: Response) => {
  res.json(heroes);
});

app.get("/heroe/:alte", (req: Request, res: Response) => {
  const alte = req.params.alte;

  const heroe = heroes.find(
    (hero: Heroe) => hero.alte.toLowerCase() === alte.toLowerCase()
  );

  if (!heroe) {
    return res.status(404).json({
      message: "Super Hero Not Found",
    });
  }

  res.json(heroe);
});

app.listen(port, () => {
  console.log(`The application is listening on port ${port}!`);
});
