import Server from './server/server';
import router from './route/router';
import MySql from './mysql/mysql';


const server = Server.init( 3000 );

server.app.use( router )

MySql.instance;

server.srtart( () => {
    console.log('Servidor corriendo en el puerto 3000')
});
