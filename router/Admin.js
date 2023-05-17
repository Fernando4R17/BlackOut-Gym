const express = require("express");
const router = express.Router();

const Admin = require('../models/admin');

router.get('/', async (req,res) => {

    try {
        
        const arrayAdminDB = await Admin.find()

        res.render("admin", {
            arrayAdmin : arrayAdminDB
        })

    } catch (error) {
        console.log(error);
    }

    
});

router.get('/crear', (req, res) => {
    res.render('crear')
});

router.post('/login', async(req, res) => {
    const {email, pswd} = req.body;

    try {
        const admin = await Admin.findOne({email});
        if (!admin) {
          console.log('Correo no registrado');
        } else {
          admin.isCorrectPassword(pswd, (err, result) => {
            if (err) {
              console.log('Error al autenticar');
            } else if (result) {
              console.log('Contraseña correcta');
              req.session.adminId = admin._id;
              res.redirect('/');
            } else {
              console.log('Contraseña incorrecta');
            }
          });
        }
      } catch (error) {
        console.log('Error al autenticar al usuario', error);
    }
});

router.get('/cerrar-sesion', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.log(err);
      } else {
          res.redirect('/');
      }
  });
});

module.exports = router;
