const express = require("express");
const router = express.Router();

router.get('/', (req,res) => {
    res.render("index", {titulo: "mi titulo dinamico"});
});

module.exports = router;    

