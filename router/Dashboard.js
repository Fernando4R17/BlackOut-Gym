const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Trabajador = require('../models/Trabajador');
const Cliente = require('../models/Cliente');
const Membresia = require('../models/membresia');
const Admin = require('../models/admin');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, ''); 
    },
    filename: (req, file, cb) => {
      const fieldName = file.fieldname;
      const ext = path.extname(file.originalname);
      const filename = `${fieldName}${ext}`;
      cb(null, filename);
    }
});
  
const upload = multer({ storage });


router.get('/', async (req,res) => {

    try {
        
        const arrayTrabajadoresDB = await Trabajador.find()
        const arrayClientesDB = await Cliente.find()
        const arrayMembresiasDB = await Membresia.find()

        if (!req.session.adminId) {
            res.redirect('/');
            return;
        }else{
            res.render("dashboard", {
                arrayTrabajadores : arrayTrabajadoresDB,
                arrayMembresias : arrayMembresiasDB,
                arrayClientes : arrayClientesDB
            })
        }

        

    } catch (error) {
        console.log(error);
    }

    
});

router.get('/crear', (req, res) => {
    res.render('crear')
});
  
router.post('/', upload.fields([{ name: 'imgG', maxCount: 1 }, { name: 'imgC', maxCount: 1 }]), async (req, res) => {
const body = req.body;

try {
    const trabajadorDB = await Trabajador.findOne({ email: body.email });

    if (trabajadorDB === null) {
    const nuevoTrabajador = await Trabajador.create(body);
    const trabajadorID = nuevoTrabajador._id; 


    const folderPath = path.join(__dirname, '../public/img/trabajadores', trabajadorID.toString());
    fs.mkdirSync(folderPath, { recursive: true });

    
    const imgGPath = req.files['imgG'][0].path;
    const imgCPath = req.files['imgC'][0].path;
    const imgGDest = path.join(folderPath, 'imgG.jpg');
    const imgCDest = path.join(folderPath, 'imgC.jpg');
    fs.renameSync(imgGPath, imgGDest);
    fs.renameSync(imgCPath, imgCDest);

    } else {
    console.log('El correo ya ha sido registrado');
    }

    res.redirect('/dashboard');
} catch (error) {
    console.log(error);
}
});
  

router.post('/membresia', async (req,res) =>{
    const body = req.body;

    body.inscripcion = body.inscripcion === "True" ? true : false;
    body.mantenimiento = body.mantenimiento === "True" ? true : false;
    body.todoeldia = body.todoeldia === "True" ? true : false;
    body.clases = body.clases === "True" ? true : false;
    body.invitados = body.invitados === "True" ? true : false;
    
    try {

        await Membresia.create(body);

        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
    }
});

router.get('/membresia/:id', async  (req, res) => {
    
    const id = req.params.id;

    try {

        const membresiaDB = await Membresia.findOne({_id: id});
   
        if (!req.session.adminId) {
            res.redirect('/');
            return;
        }else{
            res.render('detalle', {
                membresia: membresiaDB,
                error: false
            })
        }
        
        
    } catch (error) {
        res.render('../detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })

    }
})

router.put('/membresia/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;

    body.inscripcion = body.inscripcion === "True" ? true : false;
    body.mantenimiento = body.mantenimiento === "True" ? true : false;
    body.todoeldia = body.todoeldia === "True" ? true : false;
    body.clases = body.clases === "True" ? true : false;
    body.invitados = body.invitados === "True" ? true : false;

    try {
        
        const membresiaDB = await Membresia.findByIdAndUpdate(id, body, { useFindAndModify: false });

        res.json({
            estado: true,
            mensaje: 'Editado'
        })



    } catch (error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'No se puede editar'
        })
    }
});

router.delete('/membresia/:id', async  (req, res) => {
    
    const id = req.params.id;

    try {

        const membresiaDB = await Membresia.findByIdAndDelete({_id: id});
   
        if (membresiaDB) {
            res.json({
                estado: true,
                mensaje: 'Eliminado!'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'No se puedo eliminar!'
            })
        }
        
        
    } catch (error) {
        console.log(error);

    }
})

router.get('/cliente/:id', async  (req, res) => {
    
    const id = req.params.id;

    try {

        const clienteDB = await Cliente.findOne({_id: id});
   
        if (!req.session.adminId) {
            res.redirect('/');
            return;
        }else{
            res.render('detalle', {
                cliente: clienteDB,
                error: false
            })
        }
        
        
    } catch (error) {
        res.render('../detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })

    }
})

router.delete('/cliente/:id', async  (req, res) => {
    
    const id = req.params.id;

    try {

        const clienteDB = await Cliente.findByIdAndDelete({_id: id});
   
        if (clienteDB) {
            res.json({
                estado: true,
                mensaje: 'Eliminado!'
            })
        }else{
            res.json({
                estado: false,
                mensaje: 'No se puedo eliminar!'
            })
        }
        
        
    } catch (error) {
        console.log(error);

    }
})


router.get('/trabajador/:id', async  (req, res) => {
    
    const id = req.params.id;

    try {

        const trabajadorDB = await Trabajador.findOne({_id: id});
   
        if (!req.session.adminId) {
            res.redirect('/');
            return;
        }else{
            res.render('detalle', {
                trabajador: trabajadorDB,
                error: false
            })
        }
        
        
    } catch (error) {
        res.render('../detalle', {
            error: true,
            mensaje: 'No se encuentra el id seleccionado'
        })

    }
})

router.put('/trabajador/:id', async(req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        
        const trabajadorDB = await Trabajador.findByIdAndUpdate(id, body, { useFindAndModify: false });

        res.json({
            estado: true,
            mensaje: 'Editado'
        })



    } catch (error) {
        console.log(error);
        res.json({
            estado: false,
            mensaje: 'No se puede editar'
        })
    }
});

router.delete('/trabajador/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const trabajadorDB = await Trabajador.findByIdAndDelete({ _id: id });
  
      if (trabajadorDB) {
        const folderPath = path.join(__dirname, '../public/img/trabajadores', id);
        fs.rmdirSync(folderPath, { recursive: true });
  
        res.json({
          estado: true,
          mensaje: 'Eliminado!'
        });
      } else {
        res.json({
          estado: false,
          mensaje: 'No se pudo eliminar!'
        });
      }
    } catch (error) {
      console.log(error);
    }
  });


module.exports = router;