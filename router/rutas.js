const express = require("express");
const router = express.Router();

const Trabajador = require('../models/Trabajador');
const Cliente = require('../models/Cliente');
const Membresia = require('../models/membresia');

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
        res.render("user",{user});
    } catch (error) {
        console.log(error);
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
    const membresias = await Membresia.find();
    res.render("membership", {membresias});
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

