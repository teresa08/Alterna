import "reflect-metadata";
import { DataSource } from "typeorm";
import { Heroe } from "./src/models/heroe.entity";


export const AppDataSource = new DataSource({
    
    type: "mssql",
    host: "localhost",
    port:58967,
    username: "MariaTeresa",
    password: '200108mtst',
    database: "Alterna",
    synchronize: true,
    entities: [Heroe],
    logging: false,
    options: { encrypt: false }
    
})

AppDataSource.initialize()
    .then(() => {
      
        
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))