const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
const { check } = require('express-validator');

//Crea Servicios
router.post('/',
    //authFacturas,
    [
        check('nombre_servicio', 'El nombre del servicio es obligatorio').not().isEmpty(),
        check('precioTotal', 'El precio del servicio es obligatorio').not().isEmpty(),
        check('cantidadCitas', 'La Cantidad de citas es obligatoria').not().isEmpty()
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
        check('nombre_servicio', 'El nombre del servicio es obligatorio').optional().not().isEmpty(),
        check('precioTotal', 'El precio del servicio es obligatorio').optional().not().isEmpty(),
        check('cantidadCitas', 'La Cantidad de citas es obligatoria').optional().not().isEmpty()  
    ],
    serviciosController.modificarServicio
)

//Elimina Servicio
router.delete('/:id',
    serviciosController.eliminarServicio
)

module.exports = router;