//Dependencias
import Server from "./classes/server";
import router from "./routes/router";
import bodyParser from 'body-parser';
import cors from 'cors';
import Database from "./classes/database";

//Importar rutas
import BitcoinRouter from "./routes/bitcoin.route";
import { connect } from './global/getData';



//Declaraciones
const server   = Server.instance;
const database = Database.instance;

//BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

//CORS
server.app.use( cors( { origin: true, credentials: true } ) );

//Rutas
server.app.use( '/bitcoin-data', BitcoinRouter );

//Iniciar el servidor
server.app.use( '/', router );
server.start( () => {
    console.log( `Server running at ${ server.port } port` );
    connect();
});

//Iniciar base de datos
database.connect();
