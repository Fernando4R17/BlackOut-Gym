const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;


// Se crea el esquema de la coleccion

const clienteSchema = new Schema({
    nombre: String,
    email: String,
    apm: String,
    app: String,
    pswd: String,
    sexo: String,
    telefono: Number
})


// --------------------------------------------------------------------------
// Antes de guardar en la base de datos el esquema, encripta la contraseña

clienteSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('pswd')) {
        
        const nuevoCliente = this;

        bcrypt.hash(nuevoCliente.pswd, saltRounds, (err, hashedPassword) =>{
            if (err) {
                next(err);
            }else{
                nuevoCliente.pswd = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
})


// --------------------------------------------------------------------------
// Función para la validacion de contraseña

clienteSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.pswd, function(err, result){
        if (err) {
            callback(err);
        } else {
            callback(null, result); 
        }
    });
}

// Crear modelo
const Cliente = mongoose.model('Cliente' , clienteSchema);

module.exports = Cliente;