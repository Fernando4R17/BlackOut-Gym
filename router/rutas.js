const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.render("index");
});

router.get('/inicio-sesion', (req,res) => {
    res.render("login");
});

router.get('/registro', (req,res) => {
    res.render("signup");
});

router.get('/dashboard', (req, res) => {
    if (!req.session.userId) {
        res.redirect('/inicio-sesion');
        return;
    }
    res.render("index");
});




module.exports = router;    

