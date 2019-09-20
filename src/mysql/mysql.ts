import mysql = require('mysql'); 
import { AnyARecord } from 'dns';


export default class MySql {

    private static _instance: MySql;

    cnn: mysql.Connection;
    conectado: boolean = false;

    constructor() {
        console.log('clase inicializada');
        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node_db'
        });

        this.conectarDB();
        
    }
    
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery( query:string, callback: any ) {
        this.instance.cnn.query(query, (err, results: Object[], fields) => {

            if ( err ) {
                console.log( 'error en query, ', err);
                
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro solicitado no existe');
            } else {   
                callback(null, results);
            }

        });
    } 

    private conectarDB() {
        this.cnn.connect( (err: mysql.MysqlError) => {
            if( err ) {
                console.log(err);
                return;
            }
            this.conectado = true;
            console.log('Base de datos On Line');
        });
    }

}
