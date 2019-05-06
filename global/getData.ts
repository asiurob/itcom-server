// IMPORTAMOS LAS CARACTERÍSTICAS
import BitcoinModel from "../models/bitcoin.model";
const WebSocket = require('ws');

// CREAMOS UNA FUNCIÓN QUE SERÁ EJECUTADA CUANDO INICIE EL SERVIDOR
export const connect = () => {

    //CREAMOS UN SOCKET Y ESTAMOS PENDIENTES DE CAMBIOS
    let socket = new WebSocket( 'wss://ws.bitso.com' );
    const payload = JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' });

    socket.onopen = () => {
        socket.send( payload );
    }

    //CUANDO SE RECIBA UN CAMBIO SERÁ ENVIADO A MONGO
    socket.onmessage = ( data: any ) => {
        let info = JSON.parse( data.data );

        //SOLO NOS INTERESA LOS TIPOS DE TRANSACCIONES trades
        if ( info.type == 'trades' && info.payload ) {

            const model = new BitcoinModel({
                bit_id: info.payload[0].i,
                bit_price: info.payload[0].r
            });

            model.save( ( err: any, saved: any ) => {
                console.log(`Se insertó una transacción ${ JSON.stringify( saved ) }`);
            });
        }
        

    }
}