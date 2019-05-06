// IMPORTAMOS MODULOS
import {  Router, Request, Response } from 'express';
import BitcoinModel from '../models/bitcoin.model';
import { error500, error400 } from '../global/errors';



// CREAMOS UNA INSTANCIA DE ROUTER
const BitCoinRouter = Router();

// SETEAMOS EL METODO GET (DEBE ENVIAR UN LAPSO DE FECHAS (1,6,12,24))
BitCoinRouter.get('/:lapsus', ( req: Request, res: Response ) => {

    //SI NO VIENE RETORNAMOS UN ERROR
    let lapsus = Number( req.params.lapsus );
    if( !lapsus || isNaN( lapsus ) ) {
        return res.status( 400 ).json({
            message: error400
        });
    }

    // HACEMOS EL PARSING DE FECHAS
    let hour: Date = new Date();
    hour.setHours( hour.getHours() - lapsus );

    // INVOCAMOS EL MODELO PARA QUE NOS REGRESE LA INFORMACIÓN EN MONGO
    BitcoinModel.find({"added_date": {   $gte: hour  } }, 'added_date bit_price')
    .exec(( err:any, data: any ) => {

        // SI HAY UN ERROR LANZAMOS UN ERROR PREDEFINIDO
        if( err ) {
            return res.status( 500 ).json({
                message: error500
            });
        }
        let newData: Array<any> = [];

        data.forEach( ( d: any ) => {
            newData.push( {"added_date": d.added_date, "bit_price": d.bit_price} );
        });
        
        // SI NO HAY ERROR ENTONCES REGRESAMOS LA INFORMACIÓN
        res.status( 200 ).json({
            newData
        });

    });

});


export default BitCoinRouter;