const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Se crea el esquema de la coleccion

const trabajadorSchema = new Schema({
    nombre: String,
    email: String,
    apm: String,
    app: String,
    sucursal: String,
    carrera: String,
    ocupacion: String
}, { collection: 'trabajadores' })

// Crear modelo
const Trabajador = mongoose.model('Trabajador' , trabajadorSchema);

module.exports = Trabajador;