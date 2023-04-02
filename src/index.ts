import express from 'express';
import { heroeRoute } from './heroe/routes';
import { villano } from './villano/routes';



const port = 3000;
const app = express();

app.use(express.json());

app.use('/heroe', heroeRoute);
app.use('/villano', villano)

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});
