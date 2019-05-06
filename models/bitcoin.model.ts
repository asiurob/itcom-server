// IMPORTAMOS LAS REFERENCIAS
import mongos from 'mongoose';
import validator from 'mongoose-unique-validator';

// CREAMOS UN MODELO DE MONGO Y METEMOS VALIDACIONES
const Bitcoin = new mongos.Schema({
    bit_id:     { type: String, required: [true, 'El id es necesario'], unique: [true, 'El id ya existe'], max: 50, min: 3 },
    bit_price:  { type: String, required: true },
    added_date: { type: Date, default: Date.now },

}, { collection: 'bitcoins' });

// AGREGAMOS UN VALIDADOR QUE NOS DIRÁ DÓNDE ESTÁ INCORRECTO EL MODELO
Bitcoin.plugin( validator, { message: 'El {PATH} está no es válido' } );

// NOMBRAMOS EL MODELO POR SI NECESITAMOS HACER AGGREGATE
const BitcoinModel = mongos.model('Bitcoin', Bitcoin );

export default BitcoinModel;