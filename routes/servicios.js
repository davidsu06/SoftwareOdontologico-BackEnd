const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
const { check } = require('express-validator');

//Crea Servicios
router.post('/',
    //authFacturas,
    [
        check('nombre_servicio', 'El nombre es obligatorio').not().isEmpty(),
    ],
    serviciosController.crearServicio
);

//Consulta Servicios
router.get('/',
    serviciosController.obtenerServicios
);

//Modifica Servicios
router.put('/:id',
    [
        check('nombre_servicio', 'El nombre es obligatorio').optional().not().isEmpty()  
    ],
    serviciosController.modificarServicio
)

//Elimina Servicio
router.delete('/:id',
    serviciosController.eliminarServicio
)

module.exports = router;