import { Router, Request, Response } from 'express';
import MySql from '../mysql/mysql';

const router = Router(); 

router.get('/heroes', ( req: Request, res: Response)=> {
    const query = `SELECT * FROM heroes`;
    MySql.ejecutarQuery( query, ( err: any, heroes: Object[]) => {
        if ( err ) {
            res.status(400).json({
                ok: false,
                message: err
            });
        } else {
            res.json({
                ok: true,
                heroes
            });
        }
    });
    
});

router.get('/heroes/:id', ( req: Request, res: Response)=> {

    const id = req.params.id;
    const scapeId = MySql.instance.cnn.escape( id );
    const query = `SELECT * FROM heroes where id = ${ scapeId }`;
    MySql.ejecutarQuery( query, ( err: any, heroe: Object[]) => {
        if ( err ) {
            res.status(400).json({
                ok: false,
                message: err
            });
        } else {
            res.json({
                ok: true,
                heroe
            });
        }
    });

});

export default router;