const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Se crea el esquema de la coleccion

const suscripcionSchema = new Schema({
    clienteID: String,
    membresia: String,
    fechaRegistro: Date,
    fechaDesactivacion: Date,
    activo: Number
}, { collection: 'suscripciones' })

// Crear modelo
const Suscripcion = mongoose.model('Suscripcion' , suscripcionSchema);

module.exports = Suscripcion;