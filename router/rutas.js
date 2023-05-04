const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.render("index");
});

router.get('/nosotros', (req,res) => {
    res.render("nosotros");
});

router.get('/membresias', (req,res) => {
    res.render("membresias");
});



module.exports = router;    

