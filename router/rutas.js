const express = require("express");
const router = express.Router();

const Trabajador = require('../models/Trabajador');
const Cliente = require('../models/Cliente');
const Membresia = require('../models/membresia');
const Suscripcion = require('../models/suscripcion');

router.get('/', async(req,res) => {
    try {
        const equipo = await Trabajador.find();
        res.render("index", {equipo});
    } catch (error) {
        
    }
});

router.get('/inicio-sesion', async(req,res) => {
    if (!req.session.userId) {
        res.render("login");
        return;
    }
    res.render("index", {equipo});
    
    
});

router.get('/user', async (req,res) => {
    if (!req.session.userId) {
        res.redirect('/inicio-sesion');
        return;
    }
    try {
        const user = await Cliente.findOne({ _id : req.session.userId});
        const suscripcion = await Suscripcion.findOne({ clienteID : req.session.userId});
        res.render("user",{user, suscripcion});
    } catch (error) {
        console.log(error);
    }
    
});

router.get('/pago/:id', async (req,res) => {
    if (!req.session.userId) {
        res.redirect('/inicio-sesion');
        return;
    }
    try {
        const id = req.params.id;

        const membresia = await Membresia.findOne({_id: id});
        const user = await Cliente.findOne({ _id : req.session.userId});
        res.render("payment",{user, membresia});

    } catch (error) {
        console.log(error);
    }
    
});

router.post('/pago/suscripcion/', async (req,res) => {
    if (!req.session.userId) {
        res.redirect('/inicio-sesion');
        return;
    }
    try {
        const form = req.body;
        const fechaRegistro = new Date();
        const fechaDesactivacion = new Date(fechaRegistro);
        fechaDesactivacion.setMonth(fechaDesactivacion.getMonth() + form.membresiaDuracion);


        const usuarioSus = await Suscripcion.findOne({ clienteID: req.session.userId });

        const body = {
            clienteID: req.session.userId,
            membresia: form.membresiaNombre,
            fechaRegistro: fechaRegistro,
            fechaDesactivacion: fechaDesactivacion,
            activo: 1
        };

        if (usuarioSus == null) {
            await Suscripcion.create(body);
            console.log('Registro agregado correctamente');
            res.redirect('/');
            
        }else{
            console.log('Usuario Ya tiene Suscripción');
            res.redirect('/');
        }

        
    } catch (error) {
        console.log(error);
    }
    
});

router.get('/pago', async(req,res) => {
    if (!req.session.userId) {
        res.redirect('/inicio-sesion');
        return;
    }
    try {
        const membresias = await Membresia.find();
        const usuarios = await Cliente.find();
        res.render("payment" , {membresias, usuarios});
    } catch (error) {
        
    }
    
});

router.get('/registro', (req,res) => {
    if (!req.session.userId) {
        res.render("signup");
        return;
    }
    res.render("index");
});

router.get('/membresias', async(req,res) => {
    try {
        const membresias = await Membresia.find();
        res.render("membership", {membresias});
    } catch (error) {
        console.log(error);
    }
    
});

router.get('/nosotros', async(req,res) => {
    try {

        const equipo = await Trabajador.find();

        res.render("nosotros", {equipo});
    } catch (error) {
        console.log();
    }
    
});

router.get('/sucursales', (req,res) => {
    res.render("sucursal");
});

router.get('/admin', (req,res) => {
    res.render("loginAdmin");
});



module.exports = router;    

