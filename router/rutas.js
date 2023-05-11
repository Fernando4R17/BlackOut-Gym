const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.render("index");
});

router.get('/inicio-sesion', (req,res) => {
    if (!req.session.userId) {
        res.render("login");
        return;
    }
    res.render("index");
});

router.get('/registro', (req,res) => {
    if (!req.session.userId) {
        res.render("signup");
        return;
    }
    res.render("index");
});

router.get('/membresias', (req,res) => {
    res.render("membership");
});

router.get('/sucursales', (req,res) => {
    res.render("sucursal");
});

router.get('/admin', (req,res) => {
    res.render("loginAdmin");
});

router.get('/dashboard', (req, res) => {
    if (!req.session.adminId) {
        res.redirect('/');
        return;
    }
    res.render("dashboard");
});




module.exports = router;    

