const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;


// Se crea el esquema de la coleccion

const adminSchema = new Schema({
    nombre: String,
    email: String,
    app: String,
    pswd: String,
    userTipo: String
})


// --------------------------------------------------------------------------
// Antes de guardar en la base de datos el esquema, encripta la contraseña

adminSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('pswd')) {
        
        const nuevoAdmin = this;

        bcrypt.hash(nuevoAdmin.pswd, saltRounds, (err, hashedPassword) =>{
            if (err) {
                next(err);
            }else{
                nuevoAdmin.pswd = hashedPassword;
                next();
            }
        });
    }else{
        next();
    }
})


// --------------------------------------------------------------------------
// Función para la validacion de contraseña

adminSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.pswd, function(err, result){
        if (err) {
            callback(err);
        } else {
            callback(null, result); 
        }
    });
}

// Crear modelo
const Admin = mongoose.model('Admin' , adminSchema);

module.exports = Admin;