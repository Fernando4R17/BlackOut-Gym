const express = require("express");
const router = express.Router();

const Cliente = require('../models/Cliente');

router.get('/', async (req,res) => {

    try {
        
        const arrayClientesDB = await Cliente.find()

        res.render("clientes", {
            arrayClientes : arrayClientesDB
        })

    } catch (error) {
        console.log(error);
    }

});

router.get('/crear', (req, res) => {
    res.render('crear')
});

router.post('/resgistrarse', async(req, res) => {
    const body = req.body;

    try {
        const clienteDB = await Cliente.findOne({email: body.email});
        if (clienteDB === null) {
          await Cliente.create(body);
        } else{
          console.log('Correo Registrado');
        }

        res.redirect('/inicio-sesion');
    } catch (error) {
        console.log(error);
    }
});

router.post('/login', async(req, res) => {
    const {email, pswd} = req.body;

    try {
        const user = await Cliente.findOne({email});
        if (!user) {
          console.log('Correo no registrado');
        } else {
          user.isCorrectPassword(pswd, (err, result) => {
            if (err) {
              console.log('Error al autenticar');
            } else if (result) {
              console.log('Contraseña correcta');
              req.session.userId = user._id;
              res.redirect('/');;
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
