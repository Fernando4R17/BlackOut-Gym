const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Se crea el esquema de la coleccion

const membresiaSchema = new Schema({
    nombre: String,
    precio: Number,
    duracion: Number,
    inscripcion: Boolean,
    mantenimiento: Boolean,
    todoeldia: Boolean,
    clases: Boolean,
    invitados: Boolean
}, { collection: 'membresias' })

// Crear modelo
const Membresia = mongoose.model('Membresia' , membresiaSchema);

module.exports = Membresia;